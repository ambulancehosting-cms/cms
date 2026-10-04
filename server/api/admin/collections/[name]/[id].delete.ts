export default defineEventHandler(async (event) => {
  await requireUser(event, 'content')
  const def = getDef(getRouterParam(event, 'name') as string)
  await (await getDb()).collection(def.name).doc(String(getRouterParam(event, 'id'))).delete()
  return { ok: true }
})
