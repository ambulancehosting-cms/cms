import { randomBytes } from 'node:crypto'

const EXT: Record<string, string> = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' }
// Cek signature file agar tipe yang dikirim klien tidak dipercaya begitu saja.
function sniff(b: Buffer): string | null {
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg'
  if (b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png'
  if (b.length > 12 && b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP') return 'image/webp'
  if (b.length > 6 && ['GIF87a', 'GIF89a'].includes(b.subarray(0, 6).toString())) return 'image/gif'
  return null
}

export default defineEventHandler(async (event) => {
  await requireUser(event, 'media')
  const parts = await readMultipartFormData(event)
  const file = parts?.find(p => p.name === 'file' && p.filename)
  if (!file) throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang diunggah.' })
  if (file.data.length > 5 * 1024 * 1024) throw createError({ statusCode: 400, statusMessage: 'Ukuran file maksimal 5 MB.' })
  const mime = sniff(file.data)
  if (!mime) throw createError({ statusCode: 400, statusMessage: 'Format harus JPG, PNG, WebP, atau GIF.' })
  const filename = `${Date.now().toString(36)}-${randomBytes(4).toString('hex')}${EXT[mime]}`
  await bucket().file(`uploads/${filename}`).save(file.data, { contentType: mime, resumable: false })
  const ref = await (await getDb()).collection('media').add({
    filename, original: String(file.filename).slice(0, 200), mime, size: file.data.length, created_at: nowIso(),
  })
  return { id: ref.id, url: `/uploads/${filename}`, filename }
})
