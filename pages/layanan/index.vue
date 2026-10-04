<script setup lang="ts">
const site = await useSite()
usePageSeo(site, { title: 'Layanan Ambulans', description: 'Daftar layanan ambulans: antar pasien, gawat darurat, mobil jenazah, perusahaan, dan standby event.' })
const { data } = await useFetch<any[]>('/api/public/services', { key: 'services' })
</script>
<template>
  <div>
    <PageHero title="Layanan Kami" subtitle="Pilih layanan sesuai kebutuhan Anda. Kami siap membantu 24 jam." :crumbs="[{ label: 'Layanan' }]" />
    <section class="section"><div class="container"><div class="grid c3"><ServiceCard v-for="x in data" :key="x.id" :item="x" /></div></div></section>
    <CtaBand />
  </div>
</template>
