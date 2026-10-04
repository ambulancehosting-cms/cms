<script setup lang="ts">
const route = useRoute()
const site = await useSite()
const { data: item, error } = await useFetch<any>(`/api/public/posts/${route.params.slug}`, { key: `post-${route.params.slug}` })
if (error.value || !item.value) throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan', fatal: true })
usePageSeo(site, { title: item.value.seo_title || item.value.title, description: item.value.seo_description || item.value.excerpt, image: item.value.image })
</script>
<template>
  <div>
    <PageHero :title="item.title" :crumbs="[{ label: 'Artikel', to: '/artikel' }, { label: item.title }]" />
    <section class="section">
      <div class="container">
        <div class="post-meta">{{ formatDate(item.published_at) }}</div>
        <div v-if="item.image" class="post-cover"><img :src="item.image" :alt="item.title"></div>
        <Prose :text="item.body" />
      </div>
    </section>
    <CtaBand />
  </div>
</template>
