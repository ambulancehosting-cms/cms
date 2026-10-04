import { PLACEHOLDER_WA } from '../../utils/settings'
import { FieldPath } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event, 'dashboard')
  const db = await getDb()
  const days: string[] = []
  for (let i = 13; i >= 0; i--) days.push(dayKey(Date.now() - i * 864e5))

  const daily = await db.collection('events_daily')
    .where(FieldPath.documentId(), '>=', days[0]).where(FieldPath.documentId(), '<=', days[days.length - 1]).get()
  const byDay = new Map(daily.docs.map(d => [d.id, d.data()]))
  const series = days.map(day => {
    const r: any = byDay.get(day) || {}
    return { day, view: r.view || 0, wa: r.wa || 0, call: r.call || 0, form: r.form || 0 }
  })
  const totals = { view: 0, wa: 0, call: 0, form: 0 }
  for (const s of series) for (const k of Object.keys(totals) as (keyof typeof totals)[]) totals[k] += s[k]

  const requests: Record<string, number> = { baru: 0, dihubungi: 0, selesai: 0 }
  await Promise.all(Object.keys(requests).map(async (st) => {
    requests[st] = (await db.collection('requests').where('status', '==', st).count().get()).data().count
  }))

  const pageCount = new Map<string, number>()
  for (const d of daily.docs) {
    for (const [k, n] of Object.entries((d.data().pages || {}) as Record<string, number>)) {
      const path = decodeURIComponent(k)
      pageCount.set(path, (pageCount.get(path) || 0) + n)
    }
  }
  const topPages = [...pageCount].map(([path, c]) => ({ path, c })).sort((a, b) => b.c - a.c).slice(0, 6)

  const s = await getSettings()
  const checklist: { ok: boolean; text: string }[] = []
  if (user.role === 'super_admin') {
    const fleet = await db.collection('fleet').get()
    checklist.push({ ok: !user.must_change, text: 'Ganti password admin bawaan (menu Profil)' })
    checklist.push({ ok: s.whatsapp !== PLACEHOLDER_WA, text: 'Isi nomor WhatsApp dan telepon asli (Pengaturan > Kontak)' })
    checklist.push({ ok: !!s.site_url, text: 'Isi alamat domain situs (Pengaturan > SEO)' })
    checklist.push({ ok: !!s.logo, text: 'Unggah logo (Pengaturan > Identitas)' })
    checklist.push({ ok: !!s.maps_embed, text: 'Pasang peta Google Maps (Pengaturan > Kontak)' })
    checklist.push({ ok: fleet.docs.some(d => !!d.data().image), text: 'Unggah foto armada asli (Konten > Armada)' })
    checklist.push({ ok: false, text: 'Tinjau semua teks, tarif, dan area contoh; ganti dengan data sebenarnya' })
  }
  return { series, totals, requests, topPages, checklist }
})
