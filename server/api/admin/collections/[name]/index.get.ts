export default defineEventHandler(async (event) => {
  await requireUser(event, 'content')
  const def = getDef(getRouterParam(event, 'name') as string)
  return await listRows(def.name)
})
