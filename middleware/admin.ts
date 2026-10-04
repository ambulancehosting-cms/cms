export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return
  const me = useMe()
  if (me.value === undefined) await loadMeta()
  if (to.path === '/admin/login') return
  if (!me.value) return navigateTo('/admin/login')
  const need = to.meta.area as string | undefined
  if (need && !me.value.perms.includes(need)) return navigateTo('/admin')
})
