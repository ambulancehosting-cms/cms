<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; crumbs?: { label: string; to?: string }[] }>()
</script>
<template>
  <section class="page-hero">
    <div class="container">
      <nav v-if="crumbs?.length" class="crumbs" aria-label="Breadcrumb">
        <NuxtLink to="/">Beranda</NuxtLink>
        <template v-for="c in crumbs" :key="c.label"> / <NuxtLink v-if="c.to" :to="c.to">{{ c.label }}</NuxtLink><span v-else>{{ c.label }}</span></template>
      </nav>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>
