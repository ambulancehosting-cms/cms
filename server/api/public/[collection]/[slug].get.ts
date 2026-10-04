export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'collection') as string
  const slug = getRouterParam(event, 'slug') as string
  const def = getDef(name)
  if (!def.hasSlug) throw createError({ statusCode: 404, statusMessage: 'Tidak ditemukan.' })
  const snap = await (await getDb()).collection(name).where('slug', '==', slug).get()
  const doc = snap.docs.find(d => d.data().active !== 0)
  if (!doc) throw createError({ statusCode: 404, statusMessage: 'Halaman tidak ditemukan.' })
  return rowOf(doc)
})
