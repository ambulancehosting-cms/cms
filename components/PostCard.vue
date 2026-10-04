<script setup lang="ts">
defineProps<{ item: any }>()
</script>
<template>
  <NuxtLink :to="`/artikel/${item.slug}`" class="card media">
    <div class="thumb">
      <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy">
      <AppIcon v-else name="doc" :size="56" style="color:var(--primary);opacity:.4" />
    </div>
    <div class="body">
      <span class="post-meta" style="margin:0 0 6px">{{ formatDate(item.published_at) }}</span>
      <h3>{{ item.title }}</h3>
      <p>{{ item.excerpt }}</p>
      <span class="more">Baca artikel <AppIcon name="arrow" :size="16" /></span>
    </div>
  </NuxtLink>
</template>
