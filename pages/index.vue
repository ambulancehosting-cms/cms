<script setup lang="ts">
const site = await useSite()
const { wa, tel, phone } = useContact(site)
const s = computed(() => site.value.settings)
usePageSeo(site, {})

const [services, fleet, reasons, steps, stats, legal, testimonials, faqs, posts] = await Promise.all([
  useFetch<any[]>('/api/public/services', { key: 'services' }),
  useFetch<any[]>('/api/public/fleet', { key: 'fleet' }),
  useFetch<any[]>('/api/public/reasons', { key: 'reasons' }),
  useFetch<any[]>('/api/public/steps', { key: 'steps' }),
  useFetch<any[]>('/api/public/stats', { key: 'stats' }),
  useFetch<any[]>('/api/public/legal', { key: 'legal' }),
  useFetch<any[]>('/api/public/testimonials', { key: 'testimonials' }),
  useFetch<any[]>('/api/public/faqs', { key: 'faqs' }),
  useFetch<any[]>('/api/public/posts?limit=3', { key: 'posts3' }),
])
const chips = ['Respon cepat', 'Armada terawat', 'Petugas berpengalaman']
</script>

<template>
  <div>
    <section class="hero">
      <div class="container">
        <div>
          <span class="badge"><span class="dot" /> {{ s.hero_badge }}</span>
          <h1>{{ s.hero_title }}</h1>
          <p class="lead">{{ s.hero_subtitle }}</p>
          <div class="hero-actions">
            <a class="btn btn-wa" :href="wa()" target="_blank" rel="noopener"><AppIcon name="whatsapp" /> Chat WhatsApp</a>
            <a class="btn btn-call" :href="tel"><AppIcon name="phone" /> {{ phone }}</a>
          </div>
          <div class="chips">
            <span v-for="c in chips" :key="c"><AppIcon name="check" :size="16" /> {{ c }}</span>
          </div>
        </div>
        <div class="hero-art">
          <img v-if="s.hero_image" :src="s.hero_image" :alt="s.site_name">
          <AmbulanceArt v-else />
        </div>
      </div>
    </section>

    <section v-if="stats.data.value?.length" class="stats">
      <div class="container">
        <div class="stats-grid">
          <div v-for="x in stats.data.value" :key="x.id" class="stat"><b>{{ x.value }}</b><span>{{ x.label }}</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHead eyebrow="Layanan Kami" title="Layanan ambulans untuk berbagai kebutuhan" subtitle="Pilih layanan yang sesuai. Tidak yakin? Hubungi kami dan petugas akan membantu menentukan armada yang tepat." />
        <div class="grid c3">
          <ServiceCard v-for="x in services.data.value" :key="x.id" :item="x" />
        </div>
      </div>
    </section>

    <section class="section soft">
      <div class="container two-col">
        <div>
          <SectionHead eyebrow="Kenapa Kami" :title="s.home_about_title" :subtitle="s.home_about_text" />
          <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
            <div v-for="r in reasons.data.value" :key="r.id" class="info">
              <div class="icon-box"><AppIcon :name="r.icon || 'check'" :size="22" /></div>
              <div><b>{{ r.title }}</b><span>{{ r.description }}</span></div>
            </div>
          </div>
        </div>
        <div class="photo">
          <img v-if="s.about_image" :src="s.about_image" :alt="s.site_name" loading="lazy">
          <AmbulanceArt v-else style="background:linear-gradient(160deg,var(--dark),var(--primary))" />
        </div>
      </div>
    </section>

    <section v-if="fleet.data.value?.length" class="section">
      <div class="container">
        <SectionHead eyebrow="Armada" title="Unit siap jalan" subtitle="Armada bersih dan terawat dengan perlengkapan sesuai jenis layanan." />
        <div class="grid c4">
          <FleetCard v-for="x in fleet.data.value.slice(0, 4)" :key="x.id" :item="x" />
        </div>
        <p class="center" style="margin-top:28px"><NuxtLink to="/armada" class="btn btn-outline">Lihat semua armada</NuxtLink></p>
      </div>
    </section>

    <section v-if="steps.data.value?.length" class="section soft">
      <div class="container">
        <SectionHead center eyebrow="Cara Pesan" title="Pesan ambulans dalam 3 langkah" />
        <div class="steps">
          <div v-for="x in steps.data.value" :key="x.id" class="step"><h3>{{ x.title }}</h3><p>{{ x.description }}</p></div>
        </div>
      </div>
    </section>

    <section v-if="site.nav.areas.length" class="section tight">
      <div class="container">
        <SectionHead eyebrow="Jangkauan" title="Area layanan kami" />
        <div class="pills">
          <NuxtLink v-for="a in site.nav.areas" :key="a.slug" :to="`/area-layanan/${a.slug}`" class="pill"><AppIcon name="map-pin" :size="16" /> {{ a.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="legal.data.value?.length" class="section tight">
      <div class="container">
        <SectionHead eyebrow="Legalitas" title="Izin dan legalitas usaha" />
        <div class="grid c3">
          <div v-for="l in legal.data.value" :key="l.id" class="info card" style="flex-direction:row">
            <div class="icon-box"><AppIcon name="shield" :size="22" /></div>
            <div><b>{{ l.title }}</b><span>{{ l.number }}</span></div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="testimonials.data.value?.length" class="section soft">
      <div class="container">
        <SectionHead center eyebrow="Testimoni" title="Kata mereka yang pernah kami bantu" />
        <div class="grid c3">
          <div v-for="t in testimonials.data.value" :key="t.id" class="card quote">
            <div v-if="t.rating" class="stars"><AppIcon v-for="n in Math.min(5, Math.round(t.rating))" :key="n" name="star" :size="16" /></div>
            <blockquote>“{{ t.quote }}”</blockquote>
            <div class="who">{{ t.name }}<small>{{ t.role }}</small></div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="faqs.data.value?.length" class="section">
      <div class="container">
        <SectionHead eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
        <FaqList :items="faqs.data.value.slice(0, 5)" />
        <p style="margin-top:20px"><NuxtLink to="/faq" class="btn btn-outline btn-sm">Lihat semua FAQ</NuxtLink></p>
      </div>
    </section>

    <section v-if="posts.data.value?.length" class="section soft">
      <div class="container">
        <SectionHead eyebrow="Artikel" title="Informasi dan panduan" />
        <div class="grid c3"><PostCard v-for="p in posts.data.value" :key="p.id" :item="p" /></div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
