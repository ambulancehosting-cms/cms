<script setup lang="ts">
const site = await useSite()
usePageSeo(site, { title: 'Area Layanan Ambulans', description: 'Wilayah yang dilayani: antar pasien, ambulans gawat darurat, dan mobil jenazah.' })
const { data } = await useFetch<any[]>('/api/public/areas', { key: 'areas' })
</script>
<template>
  <div>
    <PageHero title="Area Layanan" subtitle="Wilayah yang kami jangkau, dalam kota maupun antar kota." :crumbs="[{ label: 'Area Layanan' }]" />
    <section class="section">
      <div class="container grid c3">
        <NuxtLink v-for="a in data" :key="a.id" :to="`/area-layanan/${a.slug}`" class="card">
          <div class="icon-box"><AppIcon name="map-pin" :size="24" /></div>
          <h3>Ambulans {{ a.name }}</h3>
          <p>{{ a.intro }}</p>
          <span class="more">Lihat area <AppIcon name="arrow" :size="16" /></span>
        </NuxtLink>
      </div>
    </section>
    <CtaBand />
  </div>
</template>
