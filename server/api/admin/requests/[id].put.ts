export default defineEventHandler(async (event) => {
  await requireUser(event, 'inbox')
  const id = String(getRouterParam(event, 'id'))
  const b = await readBody(event)
  const data: Record<string, any> = {}
  if (b.status !== undefined) {
    if (!['baru', 'dihubungi', 'selesai'].includes(b.status)) throw createError({ statusCode: 400, statusMessage: 'Status tidak valid.' })
    data.status = b.status
  }
  if (b.note !== undefined) data.note = String(b.note).slice(0, 1000)
  if (Object.keys(data).length) {
    const ref = (await getDb()).collection('requests').doc(id)
    if (!(await ref.get()).exists) throw createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan.' })
    await ref.update(data)
  }
  return { ok: true }
})
