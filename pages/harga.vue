<script setup lang="ts">
const site = await useSite()
const { wa } = useContact(site)
const s = computed(() => site.value.settings)
usePageSeo(site, { title: 'Daftar Harga Sewa Ambulans', description: 'Perkiraan tarif sewa ambulans untuk antar pasien, jenazah, standby event, dan perusahaan.' })
const { data } = await useFetch<any[]>('/api/public/prices', { key: 'prices' })
const groups = computed(() => {
  const m = new Map<string, any[]>()
  for (const p of data.value || []) {
    const k = p.category || 'Lainnya'
    if (!m.has(k)) m.set(k, [])
    m.get(k)!.push(p)
  }
  return [...m.entries()]
})
</script>
<template>
  <div>
    <PageHero title="Daftar Harga" subtitle="Perkiraan tarif awal. Estimasi pasti kami sampaikan sebelum armada berangkat." :crumbs="[{ label: 'Daftar Harga' }]" />
    <section class="section">
      <div class="container">
        <div v-for="[cat, rows] in groups" :key="cat" class="price-group">
          <h3><AppIcon name="tag" :size="20" /> {{ cat }}</h3>
          <table class="price-table">
            <thead><tr><th>Rute / paket</th><th>Harga</th><th /></tr></thead>
            <tbody>
              <tr v-for="r in rows" :key="r.id">
                <td><b>{{ r.title }}</b><small v-if="r.note">{{ r.note }}</small></td>
                <td class="amt">
                  <template v-if="r.price">mulai {{ formatRupiah(r.price) }}<small v-if="r.unit">{{ r.unit }}</small></template>
                  <template v-else>Hubungi kami</template>
                </td>
                <td style="text-align:right"><a class="btn btn-wa btn-sm" :href="wa(`Halo, saya ingin menanyakan tarif: ${cat} - ${r.title}`)" target="_blank" rel="noopener">Tanya tarif</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="!data?.length" class="empty">Daftar harga belum tersedia. Silakan hubungi kami untuk estimasi.</p>
        <div v-if="s.price_note" class="note-box">{{ s.price_note }}</div>
      </div>
    </section>
    <CtaBand title="Ingin estimasi yang pasti?" text="Kirim lokasi jemput dan tujuan, kami hitung biaya di depan." />
  </div>
</template>
