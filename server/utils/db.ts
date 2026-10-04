import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app'
import { getFirestore, FieldValue, type Firestore, type DocumentSnapshot } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Penyimpanan: Firestore (data) + Firebase Storage (upload gambar).
// Kredensial dibaca dari environment (lihat .env.example).

let db: Firestore | null = null
let ready: Promise<Firestore> | null = null

/** Service account dari FIREBASE_SERVICE_ACCOUNT (JSON/base64) atau FIREBASE_SERVICE_ACCOUNT_FILE (path file). */
function serviceAccount(): any | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT?.trim()
  if (raw) return JSON.parse(raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8'))
  const file = process.env.FIREBASE_SERVICE_ACCOUNT_FILE?.trim()
  if (file) return JSON.parse(readFileSync(resolve(process.cwd(), file), 'utf8'))
  return null
}

function credential() {
  const account = serviceAccount()
  if (account) return cert(account)
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail, FIREBASE_PRIVATE_KEY: key } = process.env
  if (projectId && clientEmail && key) return cert({ projectId, clientEmail, privateKey: key.replace(/\\n/g, '\n') })
  return applicationDefault()
}

function projectId() {
  if (process.env.FIREBASE_PROJECT_ID) return process.env.FIREBASE_PROJECT_ID
  return serviceAccount()?.project_id || process.env.GCLOUD_PROJECT
}

function firebaseApp() {
  if (getApps().length) return getApps()[0]
  const pid = projectId()
  return initializeApp({
    credential: credential(),
    projectId: pid,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || (pid ? `${pid}.firebasestorage.app` : undefined),
  })
}

export const bucket = () => getStorage(firebaseApp()).bucket()

export const nowIso = () => new Date().toISOString()

/** Firestore siap pakai (inisialisasi, seed, dan akun admin awal hanya sekali per instance). */
export function getDb(): Promise<Firestore> {
  if (db) return Promise.resolve(db)
  if (!ready) {
    ready = (async () => {
      const d = getFirestore(firebaseApp())
      d.settings({ ignoreUndefinedProperties: true })
      await seedIfEmpty(d)
      await ensureAdmin(d)
      db = d
      return d
    })().catch((e) => { ready = null; throw e })
  }
  return ready
}

export const rowOf = (s: DocumentSnapshot) => ({ id: s.id, ...(s.data() as Record<string, any>) })

/** Semua baris satu koleksi, terurut sesuai definisi (data kecil, diurutkan di memori agar tanpa indeks komposit). */
export async function listRows(name: string, opts: { onlyActive?: boolean } = {}) {
  const d = await getDb()
  const snap = await d.collection(name).get()
  let rows = snap.docs.map(rowOf)
  if (opts.onlyActive) rows = rows.filter(r => r.active !== 0)
  return sortRows(collections[name], rows)
}

export function sortRows(def: CollectionDef | undefined, rows: any[]) {
  const by = def?.orderBy
  const cmp = (a: any, b: any, key: string, dir: 1 | -1) => {
    const x = a[key] ?? '', y = b[key] ?? ''
    return x < y ? -dir : x > y ? dir : 0
  }
  return rows.sort((a, b) => {
    if (by) return cmp(a, b, by.key, by.dir === 'desc' ? -1 : 1) || cmp(a, b, 'created_at', by.dir === 'desc' ? -1 : 1)
    return cmp(a, b, 'sort_order', 1) || cmp(a, b, 'created_at', 1) || cmp(a, b, 'id', 1)
  })
}

async function ensureAdmin(d: Firestore) {
  const any = await d.collection('users').limit(1).get()
  if (!any.empty) return
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').trim().toLowerCase()
  const pw = process.env.ADMIN_PASSWORD || 'ubah-password-ini'
  const mustChange = process.env.ADMIN_PASSWORD ? 0 : 1
  await d.collection('users').add({
    email, name: 'Administrator', role: 'super_admin', password: hashPassword(pw),
    active: 1, must_change: mustChange, created_at: nowIso(),
  })
  console.log(`[cms] Akun admin awal dibuat: ${email}${mustChange ? ' / ubah-password-ini (WAJIB diganti setelah login)' : ''}`)
}

async function seedIfEmpty(d: Firestore) {
  const flag = d.collection('settings').doc('_seeded')
  if ((await flag.get()).exists) return
  const batch = d.batch()
  const stamp = nowIso()
  for (const [name, rows] of Object.entries(seedData)) {
    const def = collections[name]
    if (!def) continue
    if (!(await d.collection(name).limit(1).get()).empty) continue
    rows.forEach((row: any, i: number) => {
      const data: Record<string, any> = { sort_order: i, active: row.active === 0 ? 0 : 1, created_at: stamp, updated_at: stamp }
      for (const f of def.fields) if (row[f.key] !== undefined) data[f.key] = row[f.key]
      batch.set(d.collection(name).doc(), data)
    })
  }
  batch.set(flag, { value: '1' })
  await batch.commit()
}

/** Tanggal (YYYY-MM-DD) pada zona waktu situs, dipakai untuk statistik harian. */
export const dayKey = (ms = Date.now()) =>
  new Date(ms).toLocaleDateString('en-CA', { timeZone: process.env.APP_TIMEZONE || 'Asia/Jakarta' })

/** Hitung kejadian (view/wa/call/form) per hari. Satu dokumen per hari, tanpa menyimpan tiap event. */
export async function trackEvent(type: 'view' | 'wa' | 'call' | 'form', path: string) {
  const db = await getDb()
  const data: Record<string, any> = { [type]: FieldValue.increment(1) }
  if (type === 'view') {
    const key = encodeURIComponent(path || '/').replace(/\./g, '%2E')
    data.pages = { [key]: FieldValue.increment(1) }
  }
  await db.collection('events_daily').doc(dayKey()).set(data, { merge: true })
}
