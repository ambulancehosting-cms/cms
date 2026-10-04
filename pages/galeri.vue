<script setup lang="ts">
const site = await useSite()
usePageSeo(site, { title: 'Galeri', description: 'Dokumentasi armada dan kegiatan layanan kami.' })
const { data } = await useFetch<any[]>('/api/public/gallery', { key: 'gallery' })
</script>
<template>
  <div>
    <PageHero title="Galeri" subtitle="Dokumentasi armada dan kegiatan layanan kami." :crumbs="[{ label: 'Galeri' }]" />
    <section class="section">
      <div class="container">
        <div v-if="data?.length" class="gallery">
          <figure v-for="g in data" :key="g.id">
            <img :src="g.image" :alt="g.title" loading="lazy">
            <figcaption v-if="g.caption || g.title">{{ g.caption || g.title }}</figcaption>
          </figure>
        </div>
        <p v-else class="empty">Galeri belum tersedia.</p>
      </div>
    </section>
    <CtaBand />
  </div>
</template>
