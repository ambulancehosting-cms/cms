<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const me = useMe()
const f = reactive({ current: '', next: '', again: '' })
const busy = ref(false)
async function save() {
  if (f.next !== f.again) return toast('Konfirmasi password tidak sama.', 'err')
  busy.value = true
  try {
    await $fetch('/api/auth/password', { method: 'POST', body: { current: f.current, next: f.next } })
    toast('Password diganti'); f.current = f.next = f.again = ''
    await loadMeta()
  } catch (e) { toast(errMsg(e), 'err') }
  finally { busy.value = false }
}
</script>
<template>
  <div>
    <div class="adm-h"><div><h1>Profil</h1><p>{{ me?.name }} · {{ me?.email }} · {{ me?.role }}</p></div></div>
    <form class="a-card" style="max-width:480px" @submit.prevent="save">
      <h3>Ganti password</h3>
      <div class="a-field"><label>Password saat ini</label><input v-model="f.current" type="password" required autocomplete="current-password"></div>
      <div class="a-field"><label>Password baru</label><input v-model="f.next" type="password" minlength="8" required autocomplete="new-password"><div class="help">Minimal 8 karakter.</div></div>
      <div class="a-field"><label>Ulangi password baru</label><input v-model="f.again" type="password" minlength="8" required autocomplete="new-password"></div>
      <button class="a-btn" :disabled="busy">Simpan password</button>
    </form>
  </div>
</template>
