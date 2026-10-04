<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', area: 'settings' })
const defs = ref<any[]>([])
const values = ref<Record<string, string>>({})
const tab = ref('Identitas')
const busy = ref(false)
const groups = computed(() => [...new Set(defs.value.map(d => d.group))])
async function load() { const r: any = await $fetch('/api/admin/settings'); defs.value = r.defs; values.value = r.values }
onMounted(load)
async function save() {
  busy.value = true
  try { await $fetch('/api/admin/settings', { method: 'PUT', body: values.value }); toast('Pengaturan tersimpan') }
  catch (e) { toast(errMsg(e), 'err') }
  finally { busy.value = false }
}
</script>
<template>
  <div>
    <div class="adm-h">
      <div><h1>Pengaturan Situs</h1><p>Nomor telepon dan WhatsApp diatur di sini sekali saja, dan berlaku di seluruh tombol website.</p></div>
      <button class="a-btn" :disabled="busy" @click="save">{{ busy ? 'Menyimpan…' : 'Simpan semua' }}</button>
    </div>
    <div class="tabs"><button v-for="g in groups" :key="g" :class="{ on: tab === g }" @click="tab = g">{{ g }}</button></div>
    <div class="a-card">
      <AdminField v-for="d in defs.filter(x => x.group === tab)" :key="d.key" v-model="values[d.key]" :field="d" />
    </div>
  </div>
</template>
