<script setup lang="ts">
const props = defineProps<{ services: { title: string }[] }>()
const site = await useSite()
const { wa } = useContact(site)
const f = reactive({ name: '', phone: '', service: '', pickup: '', destination: '', message: '', website: '' })
const busy = ref(false)
const err = ref('')
const sent = ref(false)

const waText = computed(() => {
  const lines = [`Halo, saya ${f.name}.`, f.service && `Butuh layanan: ${f.service}`, f.pickup && `Lokasi jemput: ${f.pickup}`, f.destination && `Tujuan: ${f.destination}`, f.message, `Nomor saya: ${f.phone}`]
  return lines.filter(Boolean).join('\n')
})

async function submit() {
  err.value = ''
  busy.value = true
  try {
    await $fetch('/api/public/contact', { method: 'POST', body: f })
    sent.value = true
  } catch (e: any) {
    err.value = e?.data?.statusMessage || 'Gagal mengirim. Silakan hubungi kami lewat WhatsApp atau telepon.'
  } finally { busy.value = false }
}
</script>

<template>
  <div class="card">
    <div v-if="sent">
      <div class="alert ok" style="margin-bottom:16px"><b>Permintaan terkirim.</b> Petugas kami akan segera menghubungi Anda.</div>
      <p class="muted">Untuk respons lebih cepat, lanjutkan lewat WhatsApp dengan data yang sama:</p>
      <a class="btn btn-wa btn-block" :href="wa(waText)" target="_blank" rel="noopener"><AppIcon name="whatsapp" /> Lanjutkan di WhatsApp</a>
    </div>
    <form v-else class="form" @submit.prevent="submit">
      <h3 style="margin:0">Kirim permintaan</h3>
      <p class="muted" style="margin:0">Untuk kondisi darurat, langsung telepon atau chat WhatsApp agar lebih cepat.</p>
      <div class="row">
        <div class="field"><label for="cf-name">Nama</label><input id="cf-name" v-model="f.name" required maxlength="100" autocomplete="name"></div>
        <div class="field"><label for="cf-phone">No. telepon / WhatsApp</label><input id="cf-phone" v-model="f.phone" required inputmode="tel" autocomplete="tel"></div>
      </div>
      <div class="field">
        <label for="cf-service">Jenis layanan</label>
        <select id="cf-service" v-model="f.service">
          <option value="">Pilih layanan</option>
          <option v-for="s in services" :key="s.title" :value="s.title">{{ s.title }}</option>
        </select>
      </div>
      <div class="row">
        <div class="field"><label for="cf-pickup">Lokasi jemput</label><input id="cf-pickup" v-model="f.pickup" maxlength="300"></div>
        <div class="field"><label for="cf-dest">Tujuan</label><input id="cf-dest" v-model="f.destination" maxlength="300"></div>
      </div>
      <div class="field"><label for="cf-msg">Catatan (opsional)</label><textarea id="cf-msg" v-model="f.message" maxlength="1000" placeholder="Kondisi pasien, kebutuhan oksigen, jam keberangkatan, dll." /></div>
      <div class="hp" aria-hidden="true"><label>Website<input v-model="f.website" tabindex="-1" autocomplete="off"></label></div>
      <div v-if="err" class="alert err" role="alert">{{ err }}</div>
      <button class="btn btn-primary btn-block" :disabled="busy">{{ busy ? 'Mengirim…' : 'Kirim permintaan' }}</button>
    </form>
  </div>
</template>
