const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless/i
export default defineEventHandler(async (event) => {
  rateLimit(event, 'track', 120, 60 * 1000)
  if (BOT.test(getHeader(event, 'user-agent') || '')) return { ok: true }
  const b = await readBody(event).catch(() => null)
  const type = ['view', 'wa', 'call'].includes(b?.type) ? b.type : null
  if (!type) return { ok: false }
  const path = String(b?.path || '/').slice(0, 200)
  if (path.startsWith('/admin')) return { ok: true }
  await trackEvent(type, path)
  return { ok: true }
})
