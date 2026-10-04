<script setup lang="ts">
defineProps<{ item: any }>()
</script>
<template>
  <NuxtLink :to="`/layanan/${item.slug}`" class="card">
    <div class="icon-box"><AppIcon :name="item.icon || 'cross'" :size="26" /></div>
    <h3>{{ item.title }}</h3>
    <p>{{ item.summary }}</p>
    <span class="more">Selengkapnya <AppIcon name="arrow" :size="16" /></span>
  </NuxtLink>
</template>
