<script setup lang="ts">
const site = await useSite()
usePageSeo(site, { title: 'Armada Ambulans', description: 'Armada ambulans transport, gawat darurat, VIP, dan mobil jenazah yang bersih dan terawat.' })
const { data } = await useFetch<any[]>('/api/public/fleet', { key: 'fleet' })
</script>
<template>
  <div>
    <PageHero title="Armada Kami" subtitle="Unit bersih, terawat, dan dilengkapi perlengkapan sesuai jenis layanan." :crumbs="[{ label: 'Armada' }]" />
    <section class="section">
      <div class="container">
        <div v-if="data?.length" class="grid c3"><FleetCard v-for="x in data" :key="x.id" :item="x" /></div>
        <p v-else class="empty">Data armada belum tersedia.</p>
      </div>
    </section>
    <CtaBand title="Butuh armada tertentu?" text="Sampaikan kebutuhan Anda, kami siapkan unit yang paling sesuai." />
  </div>
</template>
