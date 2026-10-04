export default defineEventHandler(async (event) => {
  const me = await requireUser(event, 'users')
  const id = String(getRouterParam(event, 'id'))
  if (id === me.id) throw createError({ statusCode: 400, statusMessage: 'Anda tidak bisa menghapus akun sendiri.' })
  await (await getDb()).collection('users').doc(id).delete()
  await destroyUserSessions(id)
  return { ok: true }
})
