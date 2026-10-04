export default defineEventHandler(async (event) => {
  await requireUser(event, 'settings')
  return { defs: settingDefs, values: await getSettings() }
})
