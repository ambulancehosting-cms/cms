export default defineEventHandler(async (event) => {
  await requireUser(event, 'users')
  const b = await readBody(event)
  const email = String(b.email || '').trim().toLowerCase()
  if (!/^\S+@\S+\.\S+$/.test(email)) throw createError({ statusCode: 400, statusMessage: 'Email tidak valid.' })
  if (!String(b.name || '').trim()) throw createError({ statusCode: 400, statusMessage: 'Nama wajib diisi.' })
  if (!ROLES.includes(b.role)) throw createError({ statusCode: 400, statusMessage: 'Peran tidak valid.' })
  if (String(b.password || '').length < 8) throw createError({ statusCode: 400, statusMessage: 'Password minimal 8 karakter.' })
  const col = (await getDb()).collection('users')
  if (!(await col.where('email', '==', email).limit(1).get()).empty) throw createError({ statusCode: 400, statusMessage: 'Email sudah terdaftar.' })
  await col.add({
    email, name: String(b.name).trim(), role: b.role, password: hashPassword(String(b.password)),
    active: 1, must_change: 0, created_at: nowIso(),
  })
  return { ok: true }
})
