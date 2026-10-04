export default defineEventHandler(async (event) => {
  await requireUser(event, 'media')
  const ref = (await getDb()).collection('media').doc(String(getRouterParam(event, 'id')))
  const snap = await ref.get()
  if (!snap.exists) throw createError({ statusCode: 404, statusMessage: 'File tidak ditemukan.' })
  await bucket().file(`uploads/${snap.data()!.filename}`).delete({ ignoreNotFound: true })
  await ref.delete()
  return { ok: true }
})
