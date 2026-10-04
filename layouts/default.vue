<script setup lang="ts">
const site = await useSite()
const { wa, tel, phone } = useContact(site)
const s = computed(() => site.value.settings)
const open = ref(false)
const route = useRoute()
watch(() => route.path, () => { open.value = false })

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/armada', label: 'Armada' },
  { to: '/harga', label: 'Harga' },
  { to: '/area-layanan', label: 'Area' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/kontak', label: 'Kontak' },
]

const cssVars = computed(() =>
  `:root{--primary:${s.value.color_primary};--dark:${s.value.color_dark};--accent:${s.value.color_accent}}`)

const reqUrl = useRequestURL()
const base = computed(() => (s.value.site_url || reqUrl.origin).replace(/\/$/, ''))
const socials = computed(() => [
  ['Facebook', s.value.facebook], ['Instagram', s.value.instagram],
  ['YouTube', s.value.youtube], ['TikTok', s.value.tiktok],
].filter(([, u]) => u) as [string, string][])

useHead(() => ({
  style: [{ key: 'theme', innerHTML: cssVars.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: s.value.site_name,
      description: s.value.seo_description,
      url: base.value,
      telephone: s.value.phone,
      image: s.value.og_image || s.value.logo ? base.value + (s.value.og_image || s.value.logo) : undefined,
      address: { '@type': 'PostalAddress', streetAddress: s.value.address, addressCountry: 'ID' },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00', closes: '23:59',
      }],
      sameAs: socials.value.map(x => x[1]),
    }),
  }],
}))
</script>

<template>
  <div>
    <div class="topbar">
      <div class="container">
        <span><AppIcon name="clock" :size="15" /> {{ s.hours }}</span>
        <span class="hide-sm"><AppIcon name="map-pin" :size="15" /> {{ s.address }}</span>
        <a :href="tel"><AppIcon name="phone" :size="15" /> Darurat: {{ phone }}</a>
      </div>
    </div>

    <header class="header">
      <div class="container">
        <NuxtLink to="/" class="brand" :aria-label="s.site_name">
          <img v-if="s.logo" :src="s.logo" :alt="s.site_name">
          <span v-else class="brand-mark"><AppIcon name="cross" :size="22" /></span>
          <span v-if="!s.logo" class="brand-name">{{ s.site_name }}</span>
        </NuxtLink>
        <nav class="nav" aria-label="Menu utama">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
        </nav>
        <div class="header-cta">
          <a class="btn btn-call btn-sm" :href="tel"><AppIcon name="phone" :size="16" /> <span>{{ phone }}</span></a>
          <a class="btn btn-wa btn-sm" :href="wa()" target="_blank" rel="noopener"><AppIcon name="whatsapp" :size="16" /> WhatsApp</a>
          <button class="menu-btn" :aria-expanded="open" aria-label="Buka menu" @click="open = !open">
            <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
          </button>
        </div>
      </div>
      <div class="drawer" :class="{ open }">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="dl">{{ l.label }}</NuxtLink>
      </div>
    </header>

    <main><slot /></main>

    <footer class="footer">
      <div class="container">
        <div class="cols">
          <div>
            <NuxtLink to="/" class="brand">
              <img v-if="s.logo" :src="s.logo" :alt="s.site_name" style="filter:brightness(0) invert(1)">
              <template v-else><span class="brand-mark"><AppIcon name="cross" :size="22" /></span><span>{{ s.site_name }}</span></template>
            </NuxtLink>
            <p>{{ s.footer_text }}</p>
            <div v-if="socials.length" class="socials">
              <a v-for="[n, u] in socials" :key="n" :href="u" target="_blank" rel="noopener">{{ n }}</a>
            </div>
          </div>
          <div>
            <h4>Layanan</h4>
            <ul>
              <li v-for="x in site.nav.services" :key="x.slug"><NuxtLink :to="`/layanan/${x.slug}`">{{ x.title }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4>Area Layanan</h4>
            <ul>
              <li v-for="x in site.nav.areas" :key="x.slug"><NuxtLink :to="`/area-layanan/${x.slug}`">Ambulans {{ x.name }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4>Kontak</h4>
            <div class="fi"><AppIcon name="phone" :size="16" /><a :href="tel">{{ phone }}</a></div>
            <div class="fi"><AppIcon name="whatsapp" :size="16" /><a :href="wa()" target="_blank" rel="noopener">Chat WhatsApp</a></div>
            <div v-if="s.email" class="fi"><AppIcon name="mail" :size="16" /><a :href="`mailto:${s.email}`">{{ s.email }}</a></div>
            <div class="fi"><AppIcon name="map-pin" :size="16" /><span>{{ s.address }}</span></div>
            <div class="fi"><AppIcon name="clock" :size="16" /><span>{{ s.hours }}</span></div>
          </div>
        </div>
        <div class="copy">
          <span>© {{ new Date().getFullYear() }} {{ s.legal_name || s.site_name }}. Hak cipta dilindungi.</span>
          <span><NuxtLink to="/faq">FAQ</NuxtLink> · <NuxtLink to="/galeri">Galeri</NuxtLink></span>
        </div>
      </div>
    </footer>

    <a class="float-wa" :href="wa()" target="_blank" rel="noopener" aria-label="Chat WhatsApp"><AppIcon name="whatsapp" :size="28" /></a>
    <div class="sticky-bar">
      <a class="btn btn-call" :href="tel"><AppIcon name="phone" :size="18" /> Telepon</a>
      <a class="btn btn-wa" :href="wa()" target="_blank" rel="noopener"><AppIcon name="whatsapp" :size="18" /> WhatsApp</a>
    </div>
  </div>
</template>
