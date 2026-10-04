export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'collection') as string
  const def = getDef(name)
  const limit = Math.min(Number(getQuery(event).limit) || 200, 200)
  const keys = def.fields.filter(f => !(name === 'posts' && f.key === 'body')).map(f => f.key)
  const rows = await listRows(name, { onlyActive: true })
  return rows.slice(0, limit).map((r) => {
    const o: Record<string, any> = { id: r.id }
    for (const k of keys) o[k] = r[k] ?? null
    return o
  })
})
