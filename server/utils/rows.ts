// Helper baca/tulis baris koleksi dengan validasi berdasarkan schema.

export function getDef(name: string): CollectionDef {
  const def = collections[name]
  if (!def) throw createError({ statusCode: 404, statusMessage: 'Koleksi tidak ditemukan.' })
  return def
}

export function cleanBody(def: CollectionDef, body: any, partial = false) {
  const out: Record<string, any> = {}
  for (const f of def.fields) {
    if (!(f.key in body)) {
      if (!partial && f.required) throw createError({ statusCode: 400, statusMessage: `${f.label} wajib diisi.` })
      continue
    }
    let v = body[f.key]
    if (f.type === 'number') {
      v = v === '' || v === null || v === undefined ? null : Number(v)
      if (v !== null && !Number.isFinite(v)) throw createError({ statusCode: 400, statusMessage: `${f.label} harus berupa angka.` })
    } else if (f.type === 'boolean') {
      v = v ? 1 : 0
    } else {
      v = v === null || v === undefined ? '' : String(v).trim()
      if (f.type === 'select' && v && f.options && !f.options.includes(v)) {
        throw createError({ statusCode: 400, statusMessage: `Pilihan ${f.label} tidak valid.` })
      }
      if (f.type === 'image' && v && !/^\/uploads\/[\w.-]+$/.test(v)) {
        throw createError({ statusCode: 400, statusMessage: `${f.label} tidak valid.` })
      }
      if (v.length > 20000) throw createError({ statusCode: 400, statusMessage: `${f.label} terlalu panjang.` })
    }
    if (f.required && (v === '' || v === null)) throw createError({ statusCode: 400, statusMessage: `${f.label} wajib diisi.` })
    out[f.key] = v
  }
  return out
}

export async function uniqueSlug(table: string, base: string, exceptId?: string) {
  const db = await getDb()
  const slug = slugify(base) || 'item'
  let i = 1
  let candidate = slug
  while (true) {
    const snap = await db.collection(table).where('slug', '==', candidate).limit(2).get()
    if (snap.docs.every(d => d.id === exceptId)) return candidate
    i++
    candidate = `${slug}-${i}`
  }
}
