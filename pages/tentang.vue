<script setup lang="ts">
const site = await useSite()
const s = computed(() => site.value.settings)
usePageSeo(site, { title: s.value.about_title || 'Tentang Kami', description: `Profil ${s.value.legal_name || s.value.site_name}, penyedia layanan ambulans.`, image: s.value.about_image })
const [legal, reasons] = await Promise.all([
  useFetch<any[]>('/api/public/legal', { key: 'legal' }),
  useFetch<any[]>('/api/public/reasons', { key: 'reasons' }),
])
</script>
<template>
  <div>
    <PageHero :title="s.about_title || 'Tentang Kami'" :subtitle="s.legal_name + (s.founded_year ? ` · sejak ${s.founded_year}` : '')" :crumbs="[{ label: 'Tentang' }]" />
    <section class="section">
      <div class="container two-col" style="align-items:start">
        <div>
          <Prose :text="s.about_body" />
        </div>
        <div v-if="s.about_image" class="photo"><img :src="s.about_image" :alt="s.site_name" loading="lazy"></div>
      </div>
    </section>
    <section v-if="s.vision || s.mission" class="section soft">
      <div class="container grid c2">
        <div v-if="s.vision" class="card"><h3>Visi</h3><p style="color:var(--ink)">{{ s.vision }}</p></div>
        <div v-if="s.mission" class="card"><h3>Misi</h3><Prose :text="s.mission" /></div>
      </div>
    </section>
    <section v-if="reasons.data.value?.length" class="section">
      <div class="container">
        <SectionHead eyebrow="Komitmen" title="Yang kami jaga dalam setiap layanan" />
        <div class="grid c4">
          <div v-for="r in reasons.data.value" :key="r.id" class="card">
            <div class="icon-box"><AppIcon :name="r.icon || 'check'" :size="24" /></div>
            <h3>{{ r.title }}</h3><p>{{ r.description }}</p>
          </div>
        </div>
      </div>
    </section>
    <section v-if="legal.data.value?.length" class="section soft">
      <div class="container">
        <SectionHead eyebrow="Legalitas" title="Izin dan legalitas usaha" />
        <div class="grid c3">
          <div v-for="l in legal.data.value" :key="l.id" class="card media">
            <div v-if="l.image" class="thumb"><img :src="l.image" :alt="l.title" loading="lazy"></div>
            <div class="body"><h3>{{ l.title }}</h3><p style="margin:0">{{ l.number }}</p></div>
          </div>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>
