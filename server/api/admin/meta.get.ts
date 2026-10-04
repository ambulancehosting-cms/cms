export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const db = await getDb()
  const newRequests = (await db.collection('requests').where('status', '==', 'baru').count().get()).data().count
  return {
    collections: Object.values(collections),
    roles: ROLES,
    newRequests,
    user: { ...user, perms: permsFor(user.role) },
  }
})
