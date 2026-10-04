export default defineEventHandler(async (event) => {
  await requireUser(event, 'inbox')
  await (await getDb()).collection('requests').doc(String(getRouterParam(event, 'id'))).delete()
  return { ok: true }
})
