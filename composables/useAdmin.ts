export interface AdminUser { id: number; email: string; name: string; role: string; must_change: number; perms: string[] }

export const useMe = () => useState<AdminUser | null | undefined>('admin-me', () => undefined)
export const useMeta = () => useState<any>('admin-meta', () => null)
export const useToast = () => useState<{ msg: string; type: 'ok' | 'err' } | null>('admin-toast', () => null)

let timer: any
export function toast(msg: string, type: 'ok' | 'err' = 'ok') {
  const t = useToast()
  t.value = { msg, type }
  clearTimeout(timer)
  timer = setTimeout(() => (t.value = null), 3500)
}

export const errMsg = (e: any) => e?.data?.statusMessage || e?.statusMessage || e?.message || 'Terjadi kesalahan.'

export async function loadMeta() {
  const meta = useMeta()
  const me = useMe()
  try {
    meta.value = await $fetch('/api/admin/meta')
    me.value = meta.value.user
  } catch { me.value = null }
}
