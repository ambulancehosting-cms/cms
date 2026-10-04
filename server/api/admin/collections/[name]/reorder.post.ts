export default defineEventHandler(async (event) => {
  await requireUser(event, 'content')
  const def = getDef(getRouterParam(event, 'name') as string)
  const { id, dir } = await readBody(event)
  const ids = (await listRows(def.name)).map(r => r.id)
  const i = ids.indexOf(String(id))
  const j = dir === 'up' ? i - 1 : i + 1
  if (i < 0 || j < 0 || j >= ids.length) return { ok: true }
  ;[ids[i], ids[j]] = [ids[j], ids[i]]
  const db = await getDb()
  const batch = db.batch()
  ids.forEach((x, n) => batch.update(db.collection(def.name).doc(x), { sort_order: n }))
  await batch.commit()
  return { ok: true }
})
