export default defineEventHandler(async (event) => {
  await requireUser(event, 'inbox')
  const status = String(getQuery(event).status || '')
  const col = (await getDb()).collection('requests')
  // Filter status + urut waktu diproses di memori agar tidak butuh indeks komposit.
  const snap = status ? await col.where('status', '==', status).get() : await col.get()
  return snap.docs.map(rowOf)
    .sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0))
    .slice(0, 500)
})
