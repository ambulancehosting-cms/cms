<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string; center?: boolean }>()
</script>
<template>
  <div class="sh" :class="{ center }">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2>{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>
