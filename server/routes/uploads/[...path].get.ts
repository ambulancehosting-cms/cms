import { createReadStream, existsSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
}
export default defineEventHandler((event) => {
  const file = getRouterParam(event, 'path') as string
  if (!/^[\w.-]+$/.test(file)) throw createError({ statusCode: 404 })
  const full = join(uploadDir(), file)
  const mime = MIME[extname(file).toLowerCase()]
  if (!mime || !existsSync(full)) throw createError({ statusCode: 404 })
  setHeader(event, 'content-type', mime)
  setHeader(event, 'content-length', statSync(full).size)
  setHeader(event, 'cache-control', 'public, max-age=31536000, immutable')
  setHeader(event, 'x-content-type-options', 'nosniff')
  return sendStream(event, createReadStream(full))
})
