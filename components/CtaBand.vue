<script setup lang="ts">
const props = defineProps<{ title?: string; text?: string; waMessage?: string }>()
const site = await useSite()
const { wa, tel, phone } = useContact(site)
const s = computed(() => site.value.settings)
</script>
<template>
  <section class="section tight">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>{{ title || s.cta_title }}</h2>
          <p>{{ text || s.cta_text }}</p>
        </div>
        <div class="actions">
          <a class="btn btn-wa" :href="wa(waMessage)" target="_blank" rel="noopener"><AppIcon name="whatsapp" /> Chat WhatsApp</a>
          <a class="btn btn-call" :href="tel"><AppIcon name="phone" /> {{ phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
