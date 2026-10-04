<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', area: 'content' })
const route = useRoute()
const meta = useMeta()
const name = computed(() => route.params.name as string)
const def = computed(() => (meta.value?.collections || []).find((c: any) => c.name === name.value))
const rows = ref<any[]>([])
const editing = ref<any | null>(null) // null = tertutup, {} = baru
const isNew = ref(false)
const busy = ref(false)

async function load() {
  rows.value = []
  if (!def.value) return
  rows.value = await $fetch(`/api/admin/collections/${name.value}`)
}
watch(name, load, { immediate: true })

const listFields = computed(() => (def.value?.fields || []).filter((f: any) => f.inList && f.type !== 'image').slice(0, 3))
const imageField = computed(() => (def.value?.fields || []).find((f: any) => f.type === 'image'))

function openNew() {
  const o: any = { active: 1 }
  for (const f of def.value.fields) o[f.key] = f.type === 'number' ? '' : ''
  if (name.value === 'posts') o.published_at = new Date().toISOString().slice(0, 10)
  editing.value = o; isNew.value = true
}
function openEdit(r: any) { editing.value = { ...r }; isNew.value = false }

async function save() {
  busy.value = true
  try {
    const body: any = { active: !!editing.value.active }
    for (const f of def.value.fields) body[f.key] = editing.value[f.key]
    if (isNew.value) await $fetch(`/api/admin/collections/${name.value}`, { method: 'POST', body })
    else await $fetch(`/api/admin/collections/${name.value}/${editing.value.id}`, { method: 'PUT', body })
    toast('Tersimpan'); editing.value = null; await load()
  } catch (e) { toast(errMsg(e), 'err') }
  finally { busy.value = false }
}
async function toggle(r: any) {
  try { await $fetch(`/api/admin/collections/${name.value}/${r.id}`, { method: 'PUT', body: { active: !r.active } }); r.active = r.active ? 0 : 1 } catch (e) { toast(errMsg(e), 'err') }
}
async function remove(r: any) {
  if (!confirm(`Hapus "${r[def.value.titleField]}"? Tindakan ini tidak bisa dibatalkan.`)) return
  try { await $fetch(`/api/admin/collections/${name.value}/${r.id}`, { method: 'DELETE' }); await load() } catch (e) { toast(errMsg(e), 'err') }
}
async function move(r: any, dir: 'up' | 'down') {
  try { await $fetch(`/api/admin/collections/${name.value}/reorder`, { method: 'POST', body: { id: r.id, dir } }); await load() } catch (e) { toast(errMsg(e), 'err') }
}
const show = (v: any, f: any) => (f.type === 'number' && v ? new Intl.NumberFormat('id-ID').format(v) : v)
</script>

<template>
  <div v-if="def">
    <div class="adm-h">
      <div><h1>{{ def.label }}</h1><p v-if="def.hint">{{ def.hint }}</p></div>
      <button class="a-btn" @click="openNew"><AppIcon name="plus" :size="16" /> Tambah {{ def.singular.toLowerCase() }}</button>
    </div>
    <div class="a-card" style="padding:0;overflow:hidden">
      <div class="a-table-wrap">
        <table class="a-table">
          <thead>
            <tr><th v-if="imageField" /><th v-for="f in listFields" :key="f.key">{{ f.label }}</th><th>Status</th><th /></tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in rows" :key="r.id" :class="{ off: !r.active }">
              <td v-if="imageField" style="width:60px"><img v-if="r[imageField.key]" class="thumb-sm" :src="r[imageField.key]" alt=""></td>
              <td v-for="f in listFields" :key="f.key" :class="{ clip: f.type === 'textarea' }">{{ show(r[f.key], f) }}</td>
              <td><button class="pill-s" :class="r.active ? 'on' : 'offp'" style="border:0;cursor:pointer" :title="r.active ? 'Klik untuk sembunyikan' : 'Klik untuk tampilkan'" @click="toggle(r)">{{ r.active ? 'Tampil' : 'Disembunyikan' }}</button></td>
              <td>
                <div class="actions">
                  <template v-if="!def.noReorder">
                    <button class="a-btn ghost sm icon" aria-label="Naik" :disabled="i === 0" @click="move(r, 'up')"><AppIcon name="up" :size="15" /></button>
                    <button class="a-btn ghost sm icon" aria-label="Turun" :disabled="i === rows.length - 1" @click="move(r, 'down')"><AppIcon name="down" :size="15" /></button>
                  </template>
                  <button class="a-btn ghost sm" @click="openEdit(r)"><AppIcon name="edit" :size="14" /> Ubah</button>
                  <button class="a-btn danger sm icon" aria-label="Hapus" @click="remove(r)"><AppIcon name="trash" :size="15" /></button>
                </div>
              </td>
            </tr>
            <tr v-if="!rows.length"><td colspan="9" style="text-align:center;color:#5a6b86;padding:30px">Belum ada data. Klik "Tambah".</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="editing" class="a-modal-bg" @click.self="editing = null">
      <form class="a-modal" @submit.prevent="save">
        <div class="a-modal-h"><h3>{{ isNew ? 'Tambah' : 'Ubah' }} {{ def.singular.toLowerCase() }}</h3><button type="button" class="a-btn ghost sm icon" aria-label="Tutup" @click="editing = null"><AppIcon name="close" :size="16" /></button></div>
        <div class="a-modal-b">
          <AdminField v-for="f in def.fields" :key="f.key" v-model="editing[f.key]" :field="f" />
          <div class="a-field"><label><input v-model="editing.active" type="checkbox" :true-value="1" :false-value="0" style="width:auto;margin-right:8px">Tampilkan di website</label></div>
        </div>
        <div class="a-modal-f">
          <button type="button" class="a-btn ghost" @click="editing = null">Batal</button>
          <button class="a-btn" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan' }}</button>
        </div>
      </form>
    </div>
  </div>
  <div v-else class="a-card">Memuat…</div>
</template>
