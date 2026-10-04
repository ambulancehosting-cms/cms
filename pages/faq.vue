<script setup lang="ts">
const site = await useSite()
usePageSeo(site, { title: 'FAQ Sewa Ambulans', description: 'Pertanyaan yang sering diajukan seputar pemesanan, biaya, dan layanan ambulans.' })
const { data } = await useFetch<any[]>('/api/public/faqs', { key: 'faqs' })
useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: (data.value || []).map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    }),
  }],
}))
</script>
<template>
  <div>
    <PageHero title="Pertanyaan Umum" subtitle="Jawaban singkat seputar pemesanan, biaya, dan layanan." :crumbs="[{ label: 'FAQ' }]" />
    <section class="section"><div class="container"><FaqList v-if="data?.length" :items="data" /><p v-else class="empty">Belum ada FAQ.</p></div></section>
    <CtaBand title="Pertanyaan Anda belum terjawab?" text="Tanyakan langsung ke petugas kami, 24 jam." />
  </div>
</template>
