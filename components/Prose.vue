<script setup lang="ts">
const props = defineProps<{ text?: string | null }>()
const html = computed(() => renderMarkdown(props.text))
</script>
<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="prose" v-html="html" />
</template>
