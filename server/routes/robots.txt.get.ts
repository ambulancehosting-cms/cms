export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  const base = ((await getSettings()).site_url || getRequestURL(event).origin).replace(/\/$/, '')
  return `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: ${base}/sitemap.xml\n`
})
