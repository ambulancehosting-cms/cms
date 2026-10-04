<script setup lang="ts">
const props = defineProps<{ item: any }>()
const feats = computed(() => String(props.item.features || '').split('\n').map((s: string) => s.trim()).filter(Boolean))
</script>
<template>
  <article class="card media">
    <div class="thumb">
      <img v-if="item.image" :src="item.image" :alt="item.name" loading="lazy">
      <AmbulanceArt v-else />
    </div>
    <div class="body">
      <span v-if="item.type" class="tag">{{ item.type }}</span>
      <h3>{{ item.name }}</h3>
      <p v-if="item.description">{{ item.description }}</p>
      <ul v-if="feats.length" class="ticks">
        <li v-for="f in feats" :key="f"><AppIcon name="check" :size="16" /> {{ f }}</li>
      </ul>
      <p v-if="item.capacity" class="muted" style="margin:auto 0 0;font-size:.9rem"><AppIcon name="users" :size="15" /> {{ item.capacity }}</p>
    </div>
  </article>
</template>
