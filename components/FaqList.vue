<script setup lang="ts">
defineProps<{ items: any[] }>()
</script>
<template>
  <div class="faq">
    <details v-for="f in items" :key="f.id">
      <summary>{{ f.question }} <AppIcon name="chevron" :size="20" /></summary>
      <div class="ans">{{ f.answer }}</div>
    </details>
  </div>
</template>
