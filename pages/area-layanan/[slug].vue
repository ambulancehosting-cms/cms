<script setup lang="ts">
const route = useRoute()
const site = await useSite()
const { wa } = useContact(site)
const { data: item, error } = await useFetch<any>(`/api/public/areas/${route.params.slug}`, { key: `area-${route.params.slug}` })
if (error.value || !item.value) throw createError({ statusCode: 404, statusMessage: 'Area tidak ditemukan', fatal: true })
usePageSeo(site, { title: item.value.seo_title || `Sewa Ambulans ${item.value.name} 24 Jam`, description: item.value.seo_description || item.value.intro })
const { data: services } = await useFetch<any[]>('/api/public/services', { key: 'services' })
</script>
<template>
  <div>
    <PageHero :title="`Ambulans ${item.name}`" :subtitle="item.intro" :crumbs="[{ label: 'Area Layanan', to: '/area-layanan' }, { label: item.name }]" />
    <section class="section">
      <div class="container">
        <Prose :text="item.body" />
        <div style="margin:28px 0"><a class="btn btn-wa" :href="wa(`Halo, saya butuh ambulans di area ${item.name}.`)" target="_blank" rel="noopener"><AppIcon name="whatsapp" /> Pesan untuk area {{ item.name }}</a></div>
        <SectionHead title="Layanan yang tersedia" />
        <div class="grid c3"><ServiceCard v-for="x in services" :key="x.id" :item="x" /></div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>
