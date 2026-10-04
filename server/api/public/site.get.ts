export default defineEventHandler(async () => {
  const [settings, services, areas] = await Promise.all([
    getSettings(), listRows('services', { onlyActive: true }), listRows('areas', { onlyActive: true }),
  ])
  return {
    settings,
    nav: {
      services: services.map(r => ({ title: r.title, slug: r.slug })),
      areas: areas.map(r => ({ name: r.name, slug: r.slug })),
    },
  }
})
