export interface SiteData {
  settings: Record<string, string>
  nav: { services: { title: string; slug: string }[]; areas: { name: string; slug: string }[] }
}

/** Ambil data situs (pengaturan + navigasi). Dipanggil dengan `await` di awal setup. */
export async function useSite() {
  const { data } = await useFetch<SiteData>('/api/public/site', { key: 'site' })
  return data as Ref<SiteData>
}

const digits = (s: string) => String(s || '').replace(/\D/g, '')

export function useContact(site: Ref<SiteData>) {
  const s = computed(() => site.value.settings)
  const tel = computed(() => {
    let d = digits(s.value.phone)
    if (d.startsWith('0')) d = '62' + d.slice(1)
    return `tel:+${d}`
  })
  const wa = (msg?: string) =>
    `https://wa.me/${digits(s.value.whatsapp)}?text=${encodeURIComponent(msg || s.value.wa_message || '')}`
  return { tel, wa, phone: computed(() => s.value.phone) }
}

export function usePageSeo(site: Ref<SiteData>, o: { title?: string; description?: string; image?: string }) {
  const s = site.value.settings
  const url = useRequestURL()
  const base = (s.site_url || url.origin).replace(/\/$/, '')
  const route = useRoute()
  const title = o.title ? `${o.title} | ${s.site_name}` : (s.seo_title || `${s.site_name}: ${s.tagline}`)
  const desc = o.description || s.seo_description
  const img = o.image || s.og_image || s.hero_image
  useSeoMeta({
    title, ogTitle: title, description: desc, ogDescription: desc,
    ogImage: img ? base + img : undefined, ogType: 'website', ogSiteName: s.site_name,
    twitterCard: img ? 'summary_large_image' : 'summary',
  })
  useHead({ link: [{ rel: 'canonical', href: base + route.path }] })
}
