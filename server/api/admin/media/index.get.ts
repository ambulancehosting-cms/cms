export default defineEventHandler(async (event) => {
  await requireUser(event, 'media')
  const snap = await (await getDb()).collection('media').orderBy('created_at', 'desc').limit(500).get()
  return snap.docs.map(rowOf)
})
