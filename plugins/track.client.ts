// Pelacakan ringan tanpa cookie: kunjungan halaman, klik WhatsApp, klik telepon.
export default defineNuxtPlugin((nuxt) => {
  const send = (type: string, path: string) => {
    if (path.startsWith('/admin')) return
    const body = JSON.stringify({ type, path })
    try {
      if (navigator.sendBeacon) navigator.sendBeacon('/api/public/track', new Blob([body], { type: 'application/json' }))
      else fetch('/api/public/track', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true })
    } catch {}
  }
  const router = useRouter()
  router.afterEach((to) => send('view', to.path))
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('https://wa.me')) send('wa', location.pathname)
    else if (href.startsWith('tel:')) send('call', location.pathname)
  }, true)
})
