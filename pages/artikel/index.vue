<script setup lang="ts">
const site = await useSite()
usePageSeo(site, { title: 'Artikel & Panduan', description: 'Informasi dan panduan seputar layanan ambulans dan transportasi medis.' })
const { data } = await useFetch<any[]>('/api/public/posts', { key: 'posts' })
</script>
<template>
  <div>
    <PageHero title="Artikel & Panduan" subtitle="Informasi yang membantu Anda mengambil keputusan dengan tenang." :crumbs="[{ label: 'Artikel' }]" />
    <section class="section">
      <div class="container">
        <div v-if="data?.length" class="grid c3"><PostCard v-for="p in data" :key="p.id" :item="p" /></div>
        <p v-else class="empty">Belum ada artikel.</p>
      </div>
    </section>
    <CtaBand />
  </div>
</template>
