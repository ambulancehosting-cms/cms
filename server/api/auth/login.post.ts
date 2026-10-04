export default defineEventHandler(async (event) => {
  rateLimit(event, 'login', 10, 10 * 60 * 1000)
  const { email, password } = await readBody(event)
  if (!email || !password) throw createError({ statusCode: 400, statusMessage: 'Email dan password wajib diisi.' })
  const snap = await (await getDb()).collection('users').where('email', '==', String(email).trim().toLowerCase()).limit(1).get()
  const doc = snap.docs[0]
  const user = doc?.data()
  if (!doc || user!.active !== 1 || !verifyPassword(String(password), user!.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Email atau password salah.' })
  }
  await createSession(event, doc.id)
  return { ok: true }
})
