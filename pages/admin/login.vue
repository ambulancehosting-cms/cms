<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'admin' })
useHead({ title: 'Masuk Admin', meta: [{ name: 'robots', content: 'noindex' }] })
const email = ref('')
const password = ref('')
const busy = ref(false)
const err = ref('')
const me = useMe()
onMounted(() => { if (me.value) navigateTo('/admin') })

async function submit() {
  busy.value = true; err.value = ''
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { email: email.value, password: password.value } })
    await loadMeta()
    await navigateTo('/admin')
  } catch (e) { err.value = errMsg(e) }
  finally { busy.value = false }
}
</script>
<template>
  <div class="login-wrap">
    <form class="login-card" @submit.prevent="submit">
      <h1>Masuk ke Panel Admin</h1>
      <p style="color:#5a6b86;margin:0 0 20px">Kelola konten website Anda.</p>
      <div class="a-field"><label for="em">Email</label><input id="em" v-model="email" type="email" required autocomplete="username"></div>
      <div class="a-field"><label for="pw">Password</label><input id="pw" v-model="password" type="password" required autocomplete="current-password"></div>
      <div v-if="err" class="alert err" role="alert" style="margin-bottom:12px;padding:10px 12px;border-radius:10px;background:#fdecea;color:#8a1c14">{{ err }}</div>
      <button class="a-btn" style="width:100%;justify-content:center" :disabled="busy">{{ busy ? 'Memproses…' : 'Masuk' }}</button>
    </form>
  </div>
</template>
