export default defineNitroPlugin(() => {
  // Hangatkan koneksi dan seed data; error tidak boleh menjatuhkan server saat start.
  getDb().catch(e => console.error('[cms] Gagal menyiapkan Firestore:', e?.message || e))
})
