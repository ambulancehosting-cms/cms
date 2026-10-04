export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const { current, next } = await readBody(event)
  const ref = (await getDb()).collection('users').doc(user.id)
  const row = (await ref.get()).data() as any
  if (!verifyPassword(String(current || ''), row.password)) {
    throw createError({ statusCode: 400, statusMessage: 'Password saat ini salah.' })
  }
  if (!next || String(next).length < 8) throw createError({ statusCode: 400, statusMessage: 'Password baru minimal 8 karakter.' })
  await ref.update({ password: hashPassword(String(next)), must_change: 0 })
  return { ok: true }
})
