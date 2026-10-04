<script setup lang="ts">
const me = useMe()
const meta = useMeta()
const toastState = useToast()
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const can = (a: string) => !!me.value?.perms.includes(a)
const contentCols = computed(() => (meta.value?.collections || []) as any[])

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  me.value = null
  meta.value = null
  await navigateTo('/admin/login')
}
useHead({ title: 'Admin', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="adm">
    <div class="adm-top">
      <button aria-label="Menu" @click="open = true"><AppIcon name="menu" :size="24" /></button>
      <b>Panel Admin</b>
    </div>
    <div v-if="open" class="adm-scrim" @click="open = false" />
    <aside class="adm-side" :class="{ open }">
      <div class="adm-brand"><span class="mk"><AppIcon name="cross" :size="20" /></span> Panel Admin</div>
      <NuxtLink class="adm-link" to="/admin" exact-active-class="router-link-exact-active"><AppIcon name="chart" :size="18" /> Dashboard</NuxtLink>
      <NuxtLink v-if="can('inbox')" class="adm-link" to="/admin/inbox">
        <AppIcon name="inbox" :size="18" /> Inbox
        <span v-if="meta?.newRequests" class="cnt">{{ meta.newRequests }}</span>
      </NuxtLink>
      <template v-if="can('content')">
        <div class="adm-grp">Konten</div>
        <NuxtLink v-for="c in contentCols" :key="c.name" class="adm-link" :to="`/admin/konten/${c.name}`">
          <AppIcon name="doc" :size="18" /> {{ c.label }}
        </NuxtLink>
      </template>
      <div class="adm-grp">Sistem</div>
      <NuxtLink v-if="can('media')" class="adm-link" to="/admin/media"><AppIcon name="image" :size="18" /> Media</NuxtLink>
      <NuxtLink v-if="can('settings')" class="adm-link" to="/admin/pengaturan"><AppIcon name="settings" :size="18" /> Pengaturan</NuxtLink>
      <NuxtLink v-if="can('users')" class="adm-link" to="/admin/pengguna"><AppIcon name="users" :size="18" /> Pengguna</NuxtLink>
      <NuxtLink class="adm-link" to="/admin/profil"><AppIcon name="user" :size="18" /> Profil</NuxtLink>
      <div style="flex:1" />
      <a class="adm-link" href="/" target="_blank"><AppIcon name="external" :size="18" /> Lihat situs</a>
      <button class="adm-link" @click="logout"><AppIcon name="logout" :size="18" /> Keluar</button>
    </aside>
    <main class="adm-main">
      <div v-if="me?.must_change" class="banner">
        Anda masih memakai password bawaan. <NuxtLink to="/admin/profil"><b>Ganti password sekarang</b></NuxtLink>.
      </div>
      <slot />
    </main>
    <div v-if="toastState" class="toast" :class="toastState.type" role="status">{{ toastState.msg }}</div>
  </div>
</template>
