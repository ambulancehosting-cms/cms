export default defineEventHandler(async (event) => {
  await requireUser(event, 'content')
  const def = getDef(getRouterParam(event, 'name') as string)
  const body = await readBody(event)
  const data: Record<string, any> = cleanBody(def, body)
  if (def.hasSlug) data.slug = await uniqueSlug(def.name, data.slug || data[def.titleField])
  if (def.name === 'posts' && !data.published_at) data.published_at = new Date().toISOString().slice(0, 10)
  const col = (await getDb()).collection(def.name)
  const last = await col.orderBy('sort_order', 'desc').limit(1).get()
  const max = last.empty ? -1 : (last.docs[0].data().sort_order ?? -1)
  const stamp = nowIso()
  const ref = await col.add({
    ...data,
    sort_order: max + 1,
    active: body.active === false || body.active === 0 ? 0 : 1,
    created_at: stamp,
    updated_at: stamp,
  })
  return { id: ref.id }
})
