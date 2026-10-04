import { extname } from 'node:path'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
}
export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'path') as string
  if (!/^[\w.-]+$/.test(name)) throw createError({ statusCode: 404 })
  const mime = MIME[extname(name).toLowerCase()]
  if (!mime) throw createError({ statusCode: 404 })
  const file = bucket().file(`uploads/${name}`)
  let data: Buffer
  try { [data] = await file.download() } catch { throw createError({ statusCode: 404 }) }
  setHeader(event, 'content-type', mime)
  setHeader(event, 'cache-control', 'public, max-age=31536000, immutable')
  setHeader(event, 'x-content-type-options', 'nosniff')
  return data
})
