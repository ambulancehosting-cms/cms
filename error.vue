<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
const is404 = computed(() => props.error?.statusCode === 404)
</script>
<template>
  <div class="error-page">
    <div>
      <h1>{{ error?.statusCode || 500 }}</h1>
      <h2>{{ is404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan' }}</h2>
      <p class="muted">{{ is404 ? 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.' : 'Silakan coba lagi beberapa saat lagi.' }}</p>
      <button class="btn btn-primary" @click="clearError({ redirect: '/' })">Kembali ke beranda</button>
    </div>
  </div>
</template>
