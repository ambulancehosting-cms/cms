<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', area: 'users' })
const meta = useMeta()
const me = useMe()
const rows = ref<any[]>([])
const editing = ref<any | null>(null)
const isNew = ref(false)
const busy = ref(false)
const roleLabel: Record<string, string> = { super_admin: 'Super Admin (semua akses)', editor: 'Editor (konten & media)', operator: 'Operator (inbox saja)' }
async function load() { rows.value = await $fetch('/api/admin/users') }
onMounted(load)
function openNew() { editing.value = { email: '', name: '', role: 'editor', password: '', active: 1 }; isNew.value = true }
function openEdit(u: any) { editing.value = { ...u, password: '' }; isNew.value = false }
async function save() {
  busy.value = true
  try {
    const b = editing.value
    if (isNew.value) await $fetch('/api/admin/users', { method: 'POST', body: b })
    else await $fetch(`/api/admin/users/${b.id}`, { method: 'PUT', body: { name: b.name, role: b.role, active: !!b.active, password: b.password || undefined } })
    toast('Tersimpan'); editing.value = null; await load()
  } catch (e) { toast(errMsg(e), 'err') }
  finally { busy.value = false }
}
async function remove(u: any) {
  if (!confirm(`Hapus pengguna ${u.email}?`)) return
  try { await $fetch(`/api/admin/users/${u.id}`, { method: 'DELETE' }); await load() } catch (e) { toast(errMsg(e), 'err') }
}
</script>
<template>
  <div>
    <div class="adm-h"><div><h1>Pengguna</h1><p>Atur siapa yang boleh mengelola website dan apa yang boleh mereka lakukan.</p></div><button class="a-btn" @click="openNew"><AppIcon name="plus" :size="16" /> Tambah pengguna</button></div>
    <div class="a-card" style="padding:0;overflow:hidden"><div class="a-table-wrap">
      <table class="a-table">
        <thead><tr><th>Nama</th><th>Email</th><th>Peran</th><th>Status</th><th /></tr></thead>
        <tbody>
          <tr v-for="u in rows" :key="u.id" :class="{ off: !u.active }">
            <td><b>{{ u.name }}</b></td><td>{{ u.email }}</td><td>{{ roleLabel[u.role] || u.role }}</td>
            <td><span class="pill-s" :class="u.active ? 'on' : 'offp'">{{ u.active ? 'Aktif' : 'Nonaktif' }}</span></td>
            <td><div class="actions"><button class="a-btn ghost sm" @click="openEdit(u)"><AppIcon name="edit" :size="14" /> Ubah</button><button class="a-btn danger sm icon" :disabled="u.id === me?.id" aria-label="Hapus" @click="remove(u)"><AppIcon name="trash" :size="15" /></button></div></td>
          </tr>
        </tbody>
      </table>
    </div></div>
    <div v-if="editing" class="a-modal-bg" @click.self="editing = null">
      <form class="a-modal" style="width:min(520px,100%)" @submit.prevent="save">
        <div class="a-modal-h"><h3>{{ isNew ? 'Tambah' : 'Ubah' }} pengguna</h3></div>
        <div class="a-modal-b">
          <div class="a-field"><label>Nama</label><input v-model="editing.name" required></div>
          <div class="a-field"><label>Email</label><input v-model="editing.email" type="email" required :disabled="!isNew"></div>
          <div class="a-field"><label>Peran</label><select v-model="editing.role"><option v-for="r in meta?.roles" :key="r" :value="r">{{ roleLabel[r] }}</option></select></div>
          <div class="a-field"><label>{{ isNew ? 'Password' : 'Password baru (kosongkan bila tidak diganti)' }}</label><input v-model="editing.password" type="password" minlength="8" :required="isNew" autocomplete="new-password"><div class="help">Minimal 8 karakter.</div></div>
          <div v-if="!isNew" class="a-field"><label><input v-model="editing.active" type="checkbox" :true-value="1" :false-value="0" style="width:auto;margin-right:8px">Akun aktif</label></div>
        </div>
        <div class="a-modal-f"><button type="button" class="a-btn ghost" @click="editing = null">Batal</button><button class="a-btn" :disabled="busy">Simpan</button></div>
      </form>
    </div>
  </div>
</template>
