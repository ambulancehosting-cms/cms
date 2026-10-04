<script setup lang="ts">
const route = useRoute()
const site = await useSite()
const { wa } = useContact(site)
const { data: item, error } = await useFetch<any>(`/api/public/services/${route.params.slug}`, { key: `svc-${route.params.slug}` })
if (error.value || !item.value) throw createError({ statusCode: 404, statusMessage: 'Layanan tidak ditemukan', fatal: true })
usePageSeo(site, { title: item.value.seo_title || item.value.title, description: item.value.seo_description || item.value.summary, image: item.value.image })
const { data: others } = await useFetch<any[]>('/api/public/services', { key: 'services' })
</script>
<template>
  <div>
    <PageHero :title="item.title" :subtitle="item.summary" :crumbs="[{ label: 'Layanan', to: '/layanan' }, { label: item.title }]" />
    <section class="section">
      <div class="container two-col" style="align-items:start;grid-template-columns:1.6fr 1fr">
        <div>
          <img v-if="item.image" :src="item.image" :alt="item.title" style="border-radius:20px;margin-bottom:24px;width:100%">
          <Prose :text="item.body" />
        </div>
        <aside class="card" style="position:sticky;top:90px">
          <h3>Pesan layanan ini</h3>
          <p>Hubungi kami dan sebutkan lokasi jemput serta tujuan. Kami konfirmasi armada dan estimasi biaya.</p>
          <a class="btn btn-wa btn-block" :href="wa(`Halo, saya ingin memesan: ${item.title}`)" target="_blank" rel="noopener"><AppIcon name="whatsapp" /> Pesan via WhatsApp</a>
          <hr style="border:0;border-top:1px solid var(--line);margin:20px 0">
          <b style="color:var(--dark)">Layanan lainnya</b>
          <ul class="ticks" style="margin-top:10px">
            <li v-for="o in (others || []).filter(x => x.slug !== item.slug)" :key="o.id"><AppIcon name="arrow" :size="16" /><NuxtLink :to="`/layanan/${o.slug}`">{{ o.title }}</NuxtLink></li>
          </ul>
        </aside>
      </div>
    </section>
    <CtaBand />
  </div>
</template>
<style scoped>
@media (max-width: 860px) { .two-col { grid-template-columns: 1fr !important; } aside { position: static !important; } }
</style>
