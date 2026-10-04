<script setup lang="ts">
const props = defineProps<{ modelValue?: string | null }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
const show = ref(false)
const items = ref<any[]>([])
const busy = ref(false)
const fileEl = ref<HTMLInputElement>()

async function load() { items.value = await $fetch('/api/admin/media') }
async function openPicker() { show.value = true; try { await load() } catch (e) { toast(errMsg(e), 'err') } }
function pick(u: string) { emit('update:modelValue', u); show.value = false }

async function upload(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  busy.value = true
  try {
    const fd = new FormData()
    fd.append('file', f)
    const r: any = await $fetch('/api/admin/media', { method: 'POST', body: fd })
    await load()
    pick(r.url)
  } catch (err) { toast(errMsg(err), 'err') }
  finally { busy.value = false; if (fileEl.value) fileEl.value.value = '' }
}
</script>

<template>
  <div class="img-pick">
    <div class="prev"><img v-if="modelValue" :src="modelValue" alt=""><AppIcon v-else name="image" :size="26" /></div>
    <button type="button" class="a-btn ghost sm" @click="openPicker"><AppIcon name="image" :size="15" /> {{ modelValue ? 'Ganti' : 'Pilih / unggah' }}</button>
    <button v-if="modelValue" type="button" class="a-btn danger sm" @click="emit('update:modelValue', '')">Hapus</button>
  </div>
  <div v-if="show" class="a-modal-bg" @click.self="show = false">
    <div class="a-modal wide">
      <div class="a-modal-h">
        <h3>Pilih gambar</h3>
        <div class="a-row">
          <input ref="fileEl" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden @change="upload">
          <button type="button" class="a-btn sm" :disabled="busy" @click="fileEl?.click()"><AppIcon name="upload" :size="15" /> {{ busy ? 'Mengunggah…' : 'Unggah baru' }}</button>
          <button type="button" class="a-btn ghost sm icon" aria-label="Tutup" @click="show = false"><AppIcon name="close" :size="16" /></button>
        </div>
      </div>
      <div class="a-modal-b">
        <div v-if="items.length" class="media-grid">
          <button v-for="m in items" :key="m.id" type="button" class="media-item" @click="pick(`/uploads/${m.filename}`)">
            <img :src="`/uploads/${m.filename}`" :alt="m.original">
          </button>
        </div>
        <p v-else style="color:#5a6b86">Belum ada gambar. Klik "Unggah baru". Format JPG, PNG, WebP, GIF, maks. 5 MB.</p>
      </div>
    </div>
  </div>
</template>
