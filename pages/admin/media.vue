<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', area: 'media' })
const items = ref<any[]>([])
const busy = ref(false)
const fileEl = ref<HTMLInputElement>()
async function load() { items.value = await $fetch('/api/admin/media') }
onMounted(load)
async function upload(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  busy.value = true
  for (const f of files) {
    try { const fd = new FormData(); fd.append('file', f); await $fetch('/api/admin/media', { method: 'POST', body: fd }) }
    catch (err) { toast(`${f.name}: ${errMsg(err)}`, 'err') }
  }
  busy.value = false
  if (fileEl.value) fileEl.value.value = ''
  await load()
}
async function remove(m: any) {
  if (!confirm('Hapus gambar ini? Halaman yang memakainya akan menampilkan gambar kosong.')) return
  try { await $fetch(`/api/admin/media/${m.id}`, { method: 'DELETE' }); await load() } catch (e) { toast(errMsg(e), 'err') }
}
</script>
<template>
  <div>
    <div class="adm-h">
      <div><h1>Media</h1><p>Pustaka gambar. JPG, PNG, WebP, GIF, maks. 5 MB per file. Kompres foto besar sebelum diunggah agar situs tetap cepat.</p></div>
      <div>
        <input ref="fileEl" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" hidden @change="upload">
        <button class="a-btn" :disabled="busy" @click="fileEl?.click()"><AppIcon name="upload" :size="16" /> {{ busy ? 'Mengunggah…' : 'Unggah gambar' }}</button>
      </div>
    </div>
    <div class="a-card">
      <div v-if="items.length" class="media-grid">
        <div v-for="m in items" :key="m.id" class="media-item" style="cursor:default">
          <img :src="`/uploads/${m.filename}`" :alt="m.original" loading="lazy">
          <button class="a-btn danger sm icon del" aria-label="Hapus" @click="remove(m)"><AppIcon name="trash" :size="14" /></button>
        </div>
      </div>
      <p v-else style="color:#5a6b86;margin:0">Belum ada gambar.</p>
    </div>
  </div>
</template>
