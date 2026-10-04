<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', area: 'dashboard' })
const me = useMe()
const { data: st } = await useFetch<any>('/api/admin/stats', { server: false })
const max = computed(() => Math.max(1, ...(st.value?.series || []).map((d: any) => d.view)))
const done = computed(() => (st.value?.checklist || []).filter((c: any) => c.ok).length)
</script>
<template>
  <div>
    <div class="adm-h"><div><h1>Dashboard</h1><p>Halo, {{ me?.name }}. Ringkasan 14 hari terakhir.</p></div></div>
    <div v-if="st" class="a-grid" style="gap:16px">
      <div class="a-grid g4">
        <div class="a-card kpi"><b>{{ st.totals.view }}</b><span>Kunjungan halaman</span></div>
        <div class="a-card kpi"><b>{{ st.totals.wa }}</b><span>Klik WhatsApp</span></div>
        <div class="a-card kpi"><b>{{ st.totals.call }}</b><span>Klik telepon</span></div>
        <div class="a-card kpi"><b>{{ st.totals.form }}</b><span>Formulir masuk</span></div>
        <NuxtLink v-if="me?.perms.includes('inbox')" to="/admin/inbox" class="a-card kpi" :class="{ warn: st.requests.baru }" style="text-decoration:none"><b>{{ st.requests.baru }}</b><span>Permintaan baru (belum dihubungi)</span></NuxtLink>
      </div>

      <div class="a-grid g2">
        <div class="a-card">
          <h3>Kunjungan per hari</h3>
          <div class="bars">
            <div v-for="d in st.series" :key="d.day" class="col" :title="`${d.day}: ${d.view} kunjungan, ${d.wa} WA, ${d.call} telepon`">
              <div class="bar" :style="{ height: (d.view / max) * 100 + '%' }" />
              <small>{{ d.day.slice(8) }}</small>
            </div>
          </div>
        </div>
        <div class="a-card">
          <h3>Halaman terpopuler</h3>
          <table class="a-table">
            <tbody>
              <tr v-for="p in st.topPages" :key="p.path"><td>{{ p.path }}</td><td style="text-align:right"><b>{{ p.c }}</b></td></tr>
              <tr v-if="!st.topPages.length"><td style="color:#5a6b86">Belum ada data kunjungan.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="st.checklist.length" class="a-card">
        <h3>Checklist sebelum go-live ({{ done }}/{{ st.checklist.length }})</h3>
        <ul class="checklist">
          <li v-for="c in st.checklist" :key="c.text">
            <span class="ck" :class="c.ok ? 'ok' : 'no'"><AppIcon v-if="c.ok" name="check" :size="13" /></span>
            <span :style="{ color: c.ok ? '#5a6b86' : 'inherit' }">{{ c.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
