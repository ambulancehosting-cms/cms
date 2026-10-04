export default defineEventHandler(async (event) => {
  await requireUser(event, 'settings')
  const body = await readBody(event)
  const db = await getDb()
  const batch = db.batch()
  for (const d of settingDefs) {
    if (!(d.key in body)) continue
    let v = String(body[d.key] ?? '').trim()
    if (d.type === 'color' && !/^#[0-9a-fA-F]{6}$/.test(v)) v = d.default
    if (d.type === 'image' && v && !/^\/uploads\/[\w.-]+$/.test(v)) v = ''
    if (d.key === 'whatsapp') v = v.replace(/\D/g, '').replace(/^0/, '62')
    if (d.key === 'site_url') v = v.replace(/\/+$/, '')
    if (/^(maps_embed|maps_link|facebook|instagram|youtube|tiktok|site_url)$/.test(d.key) && v && !/^https?:\/\//.test(v)) {
      throw createError({ statusCode: 400, statusMessage: `${d.label} harus diawali http:// atau https://` })
    }
    batch.set(db.collection('settings').doc(d.key), { value: v })
  }
  await batch.commit()
  return { ok: true }
})
