export default defineEventHandler(async (event) => {
  const base = ((await getSettings()).site_url || getRequestURL(event).origin).replace(/\/$/, '')
  const urls: { loc: string; lastmod?: string }[] = [
    '/', '/layanan', '/armada', '/harga', '/area-layanan', '/tentang', '/galeri', '/artikel', '/faq', '/kontak',
  ].map(p => ({ loc: base + p }))
  const add = async (table: string, prefix: string) => {
    for (const r of await listRows(table, { onlyActive: true })) {
      urls.push({ loc: `${base}${prefix}/${r.slug}`, lastmod: String(r.updated_at || '').slice(0, 10) })
    }
  }
  await add('services', '/layanan'); await add('areas', '/area-layanan'); await add('posts', '/artikel')
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
    `\n</urlset>\n`
})
