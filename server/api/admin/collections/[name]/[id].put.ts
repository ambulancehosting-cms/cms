export default defineEventHandler(async (event) => {
  await requireUser(event, 'content')
  const def = getDef(getRouterParam(event, 'name') as string)
  const id = String(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const ref = (await getDb()).collection(def.name).doc(id)
  const cur = await ref.get()
  if (!cur.exists) throw createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan.' })
  const data: Record<string, any> = cleanBody(def, body, true)
  if (def.hasSlug && 'slug' in data) {
    data.slug = await uniqueSlug(def.name, data.slug || data[def.titleField] || cur.data()![def.titleField], id)
  }
  if ('active' in body) data.active = body.active ? 1 : 0
  if (!Object.keys(data).length) return { ok: true }
  data.updated_at = nowIso()
  await ref.update(data)
  return { ok: true }
})
