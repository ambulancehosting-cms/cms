export default defineEventHandler(async (event) => {
  rateLimit(event, 'contact', 5, 10 * 60 * 1000)
  const b = await readBody(event)
  if (b?.website) return { ok: true } // honeypot
  const clip = (v: any, n: number) => String(v ?? '').trim().slice(0, n)
  const name = clip(b?.name, 100)
  const phone = clip(b?.phone, 30)
  if (!name) throw createError({ statusCode: 400, statusMessage: 'Nama wajib diisi.' })
  if (phone.replace(/\D/g, '').length < 8) throw createError({ statusCode: 400, statusMessage: 'Nomor telepon/WhatsApp tidak valid.' })
  await (await getDb()).collection('requests').add({
    name, phone, service: clip(b?.service, 100), pickup: clip(b?.pickup, 300),
    destination: clip(b?.destination, 300), message: clip(b?.message, 1000),
    status: 'baru', note: '', created_at: nowIso(),
  })
  await trackEvent('form', '/kontak')
  return { ok: true }
})
