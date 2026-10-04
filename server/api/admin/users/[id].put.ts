export default defineEventHandler(async (event) => {
  const me = await requireUser(event, 'users')
  const id = String(getRouterParam(event, 'id'))
  const b = await readBody(event)
  const ref = (await getDb()).collection('users').doc(id)
  const snap = await ref.get()
  if (!snap.exists) throw createError({ statusCode: 404, statusMessage: 'Pengguna tidak ditemukan.' })
  const target = snap.data() as any
  const role = b.role ?? target.role
  const active = b.active === undefined ? target.active : (b.active ? 1 : 0)
  if (!ROLES.includes(role)) throw createError({ statusCode: 400, statusMessage: 'Peran tidak valid.' })
  if (id === me.id && (role !== 'super_admin' || !active)) {
    throw createError({ statusCode: 400, statusMessage: 'Anda tidak bisa menurunkan atau menonaktifkan akun sendiri.' })
  }
  const data: Record<string, any> = { name: String(b.name ?? target.name).trim() || target.name, role, active }
  if (b.password) {
    if (String(b.password).length < 8) throw createError({ statusCode: 400, statusMessage: 'Password minimal 8 karakter.' })
    data.password = hashPassword(String(b.password))
    data.must_change = 0
  }
  await ref.update(data)
  if (!active || b.password) await destroyUserSessions(id)
  return { ok: true }
})
