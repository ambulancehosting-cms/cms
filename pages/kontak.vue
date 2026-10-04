<script setup lang="ts">
const site = await useSite()
const { wa, tel, phone } = useContact(site)
const s = computed(() => site.value.settings)
usePageSeo(site, { title: 'Kontak & Pemesanan', description: `Hubungi ${s.value.site_name}: telepon, WhatsApp, atau kirim permintaan online. ${s.value.hours}.` })
const { data: services } = await useFetch<any[]>('/api/public/services', { key: 'services' })
</script>
<template>
  <div>
    <PageHero title="Kontak & Pemesanan" :subtitle="`${s.hours}. Untuk kondisi darurat, langsung telepon.`" :crumbs="[{ label: 'Kontak' }]" />
    <section class="section">
      <div class="container contact-grid">
        <div>
          <div class="info-list">
            <div class="info"><div class="icon-box"><AppIcon name="phone" :size="20" /></div><div><b>Telepon darurat</b><a :href="tel">{{ phone }}</a></div></div>
            <div class="info"><div class="icon-box"><AppIcon name="whatsapp" :size="20" /></div><div><b>WhatsApp</b><a :href="wa()" target="_blank" rel="noopener">Chat sekarang</a></div></div>
            <div v-if="s.email" class="info"><div class="icon-box"><AppIcon name="mail" :size="20" /></div><div><b>Email</b><a :href="`mailto:${s.email}`">{{ s.email }}</a></div></div>
            <div class="info"><div class="icon-box"><AppIcon name="map-pin" :size="20" /></div><div><b>Alamat</b><span>{{ s.address }}</span><br v-if="s.maps_link"><a v-if="s.maps_link" :href="s.maps_link" target="_blank" rel="noopener">Buka di Google Maps</a></div></div>
            <div class="info"><div class="icon-box"><AppIcon name="clock" :size="20" /></div><div><b>Jam operasional</b><span>{{ s.hours }}</span></div></div>
          </div>
          <iframe v-if="s.maps_embed" class="map" style="margin-top:24px" :src="s.maps_embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Lokasi kami" />
        </div>
        <ContactForm :services="services || []" />
      </div>
    </section>
  </div>
</template>
