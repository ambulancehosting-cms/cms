<script setup lang="ts">
const props = defineProps<{ field: any; modelValue: any }>()
const emit = defineEmits<{ 'update:modelValue': [any] }>()
const v = computed({ get: () => props.modelValue ?? '', set: (x) => emit('update:modelValue', x) })
const id = `f-${props.field.key}-${Math.random().toString(36).slice(2, 7)}`
</script>

<template>
  <div class="a-field">
    <label :for="id">{{ field.label }}<span v-if="field.required" style="color:#e5352b"> *</span></label>
    <AdminImagePicker v-if="field.type === 'image'" v-model="v" />
    <textarea v-else-if="field.type === 'textarea' || field.type === 'lines'" :id="id" v-model="v" />
    <template v-else-if="field.type === 'markdown'">
      <textarea :id="id" v-model="v" class="md" />
      <div class="help">Format: <code>## Judul</code>, <code>**tebal**</code>, <code>- daftar</code>, <code>1. daftar bernomor</code>, <code>[teks](https://tautan)</code>. Baris kosong = paragraf baru.</div>
    </template>
    <select v-else-if="field.type === 'select'" :id="id" v-model="v">
      <option value="">- pilih -</option>
      <option v-for="o in field.options" :key="o" :value="o">{{ o }}</option>
    </select>
    <input v-else-if="field.type === 'number'" :id="id" v-model="v" type="number" step="any">
    <input v-else-if="field.type === 'date'" :id="id" v-model="v" type="date">
    <input v-else-if="field.type === 'color'" :id="id" v-model="v" type="color">
    <input v-else :id="id" v-model="v" type="text" :placeholder="field.placeholder">
    <div v-if="field.help" class="help">{{ field.help }}</div>
  </div>
</template>
