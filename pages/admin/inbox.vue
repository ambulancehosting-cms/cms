<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', area: 'inbox' })
const filter = ref('')
const rows = ref<any[]>([])
const meta = useMeta()
async function load() {
  rows.value = await $fetch('/api/admin/requests', { query: { status: filter.value } })
  meta.value && ((meta.value.newRequests = (await $fetch<any[]>('/api/admin/requests', { query: { status: 'baru' } })).length))
}
onMounted(load)
watch(filter, load)

async function setStatus(r: any, status: string) {
  try { await $fetch(`/api/admin/requests/${r.id}`, { method: 'PUT', body: { status } }); r.status = status; await load() } catch (e) { toast(errMsg(e), 'err') }
}
async function saveNote(r: any) {
  try { await $fetch(`/api/admin/requests/${r.id}`, { method: 'PUT', body: { note: r.note || '' } }); toast('Catatan disimpan') } catch (e) { toast(errMsg(e), 'err') }
}
async function remove(r: any) {
  if (!confirm(`Hapus permintaan dari ${r.name}? Data pasien akan hilang permanen.`)) return
  try { await $fetch(`/api/admin/requests/${r.id}`, { method: 'DELETE' }); await load() } catch (e) { toast(errMsg(e), 'err') }
}
const waUrl = (r: any) => {
  let d = String(r.phone).replace(/\D/g, '')
  if (d.startsWith('0')) d = '62' + d.slice(1)
  return `https://wa.me/${d}?text=${encodeURIComponent(`Halo ${r.name}, kami dari layanan ambulans menindaklanjuti permintaan Anda.`)}`
}
const fmt = (d: string) => d ? new Date(d).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : ''
</script>
<template>
  <div>
    <div class="adm-h"><div><h1>Inbox Permintaan</h1><p>Permintaan dari formulir website. Data ini bersifat pribadi, jangan dibagikan.</p></div></div>
    <div class="tabs">
      <button v-for="t in [['', 'Semua'], ['baru', 'Baru'], ['dihubungi', 'Dihubungi'], ['selesai', 'Selesai']]" :key="t[0]" :class="{ on: filter === t[0] }" @click="filter = t[0]">{{ t[1] }}</button>
    </div>
    <div class="a-grid">
      <div v-for="r in rows" :key="r.id" class="a-card">
        <div class="a-row" style="justify-content:space-between;align-items:flex-start">
          <div>
            <b style="font-size:1.05rem">{{ r.name }}</b> <span class="pill-s" :class="r.status">{{ r.status }}</span>
            <div style="color:#5a6b86;font-size:.85rem">{{ fmt(r.created_at) }}</div>
          </div>
          <div class="a-row">
            <a class="a-btn sm" :href="waUrl(r)" target="_blank" rel="noopener"><AppIcon name="whatsapp" :size="14" /> WhatsApp</a>
            <a class="a-btn ghost sm" :href="`tel:${r.phone}`"><AppIcon name="phone" :size="14" /> {{ r.phone }}</a>
          </div>
        </div>
        <div style="margin:12px 0;display:grid;gap:4px">
          <div v-if="r.service"><b>Layanan:</b> {{ r.service }}</div>
          <div v-if="r.pickup"><b>Jemput:</b> {{ r.pickup }}</div>
          <div v-if="r.destination"><b>Tujuan:</b> {{ r.destination }}</div>
          <div v-if="r.message"><b>Catatan:</b> {{ r.message }}</div>
        </div>
        <div class="a-row">
          <div class="a-field" style="flex:1;min-width:220px;margin:0"><input v-model="r.note" placeholder="Catatan internal…" @blur="saveNote(r)"></div>
          <button class="a-btn ghost sm" :disabled="r.status === 'baru'" @click="setStatus(r, 'baru')">Baru</button>
          <button class="a-btn ghost sm" :disabled="r.status === 'dihubungi'" @click="setStatus(r, 'dihubungi')">Dihubungi</button>
          <button class="a-btn sm" :disabled="r.status === 'selesai'" @click="setStatus(r, 'selesai')">Selesai</button>
          <button class="a-btn danger sm icon" aria-label="Hapus" @click="remove(r)"><AppIcon name="trash" :size="15" /></button>
        </div>
      </div>
      <div v-if="!rows.length" class="a-card" style="color:#5a6b86;text-align:center">Belum ada permintaan.</div>
    </div>
  </div>
</template>
