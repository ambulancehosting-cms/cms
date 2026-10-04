export default defineEventHandler(async (event) => {
  await requireUser(event, 'users')
  const snap = await (await getDb()).collection('users').get()
  return snap.docs.map((d) => {
    const { email, name, role, active, created_at } = d.data()
    return { id: d.id, email, name, role, active, created_at }
  }).sort((a, b) => (a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0))
})
