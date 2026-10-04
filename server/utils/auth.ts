import { scryptSync, randomBytes, timingSafeEqual, createHash } from 'node:crypto'
import type { H3Event } from 'h3'

export type Role = 'super_admin' | 'editor' | 'operator'
export type Area = 'content' | 'media' | 'settings' | 'inbox' | 'users' | 'dashboard'

const PERMS: Record<Role, Area[]> = {
  super_admin: ['content', 'media', 'settings', 'inbox', 'users', 'dashboard'],
  editor: ['content', 'media', 'dashboard'],
  operator: ['inbox', 'dashboard'],
}
export const ROLES: Role[] = ['super_admin', 'editor', 'operator']
export const can = (role: Role, area: Area) => !!PERMS[role]?.includes(area)
export const permsFor = (role: Role) => PERMS[role] || []

export function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString('hex')
  return `${salt}:${scryptSync(pw, salt, 64).toString('hex')}`
}

export function verifyPassword(pw: string, stored: string): boolean {
  const [salt, hash] = String(stored).split(':')
  if (!salt || !hash) return false
  const a = Buffer.from(hash, 'hex')
  const b = scryptSync(pw, salt, 64)
  return a.length === b.length && timingSafeEqual(a, b)
}

const sha = (s: string) => createHash('sha256').update(s).digest('hex')
const DAYS = 7

export async function createSession(event: H3Event, userId: string) {
  const db = await getDb()
  const token = randomBytes(32).toString('hex')
  const exp = new Date(Date.now() + DAYS * 864e5).toISOString()
  // Bersihkan sesi kedaluwarsa (best effort).
  const old = await db.collection('sessions').where('expires_at', '<', nowIso()).limit(50).get()
  if (!old.empty) { const b = db.batch(); old.docs.forEach(d => b.delete(d.ref)); await b.commit() }
  await db.collection('sessions').doc(sha(token)).set({ user_id: userId, expires_at: exp })
  setCookie(event, 'sid', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: getRequestProtocol(event, { xForwardedProto: true }) === 'https',
    path: '/',
    maxAge: DAYS * 86400,
  })
}

export async function destroySession(event: H3Event) {
  const token = getCookie(event, 'sid')
  if (token) await (await getDb()).collection('sessions').doc(sha(token)).delete()
  deleteCookie(event, 'sid', { path: '/' })
}

/** Hapus semua sesi milik seorang pengguna (saat dinonaktifkan atau ganti password). */
export async function destroyUserSessions(userId: string) {
  const db = await getDb()
  const snap = await db.collection('sessions').where('user_id', '==', userId).get()
  if (snap.empty) return
  const b = db.batch(); snap.docs.forEach(d => b.delete(d.ref)); await b.commit()
}

export interface SessionUser { id: string; email: string; name: string; role: Role; must_change: number }

export async function getSessionUser(event: H3Event): Promise<SessionUser | null> {
  const token = getCookie(event, 'sid')
  if (!token) return null
  const db = await getDb()
  const s = await db.collection('sessions').doc(sha(token)).get()
  if (!s.exists || s.data()!.expires_at <= nowIso()) return null
  const u = await db.collection('users').doc(s.data()!.user_id).get()
  if (!u.exists || u.data()!.active !== 1) return null
  const { email, name, role, must_change } = u.data() as any
  return { id: u.id, email, name, role, must_change: must_change ?? 0 }
}

export async function requireUser(event: H3Event, area?: Area): Promise<SessionUser> {
  const user = await getSessionUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Silakan login terlebih dahulu.' })
  if (area && !can(user.role, area)) throw createError({ statusCode: 403, statusMessage: 'Anda tidak punya akses ke fitur ini.' })
  return user
}

const buckets = new Map<string, { n: number; reset: number }>()
export function rateLimit(event: H3Event, name: string, max: number, windowMs: number) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const key = `${name}:${ip}`
  const now = Date.now()
  const b = buckets.get(key)
  if (!b || b.reset < now) { buckets.set(key, { n: 1, reset: now + windowMs }); return }
  b.n++
  if (b.n > max) throw createError({ statusCode: 429, statusMessage: 'Terlalu banyak percobaan. Coba lagi beberapa saat lagi.' })
}
