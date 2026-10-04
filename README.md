# Template Website Ambulans (Company Profile + Admin)

Nuxt 3 (Vue) full-stack: halaman publik SEO-friendly bertema biru-putih + panel admin untuk mengelola semua konten. Database SQLite (satu file), tanpa layanan eksternal.

## Menjalankan

```bash
npm install
cp .env.example .env      # isi ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev               # pengembangan  → http://localhost:3000
npm run build && npm start   # produksi
```

Persyaratan: Node 20+ (diuji di Node 22). `better-sqlite3` adalah modul native, jadi jalankan `npm install` di server yang sama dengan OS target.

Panel admin: `/admin`. Akun awal dibuat otomatis saat database kosong. Bila `ADMIN_PASSWORD` tidak diisi, akunnya `admin@example.com` / `ubah-password-ini` dan panel akan memaksa banner ganti password.

## Untuk klien baru (template)

1. Deploy satu instance per klien dengan `DATA_DIR` sendiri.
2. Login admin, isi **Pengaturan**: nama brand, logo, nomor WhatsApp/telepon (satu tempat, berlaku di semua tombol), alamat, peta, warna, domain (untuk sitemap/canonical).
3. Ganti semua konten contoh (Layanan, Armada, Harga, Area, FAQ, Artikel). **Semua data awal hanyalah contoh**, termasuk tarif dan nama perusahaan.
4. Ikuti **Checklist go-live** di dashboard.

Warna biru/aksen diubah dari Pengaturan > Tampilan, tanpa coding.

## Yang bisa dikelola admin

Pengaturan situs, Layanan, Armada, Daftar Harga, Area Layanan (halaman per kota untuk SEO lokal), Keunggulan, Alur Pemesanan, Angka Kepercayaan, Legalitas, Testimoni, Galeri, FAQ, Artikel (dengan SEO per halaman), Media, Inbox permintaan (status baru/dihubungi/selesai + catatan), Pengguna dan peran.

| Peran | Akses |
|---|---|
| super_admin | Semua |
| editor | Konten dan media |
| operator | Inbox dan dashboard |

Dashboard menampilkan kunjungan, klik WhatsApp, klik telepon, dan formulir masuk 14 hari terakhir (tanpa cookie).

## Deploy singkat

```bash
npm ci && npm run build
DATA_DIR=/var/lib/ambulan PORT=3000 node .output/server/index.mjs   # atau pakai PM2/systemd
```

- Taruh di belakang Nginx/Caddy dengan HTTPS. Cookie login otomatis `secure` bila `X-Forwarded-Proto: https` diteruskan.
- **Backup**: cukup salin folder `DATA_DIR` (berisi `app.db` dan `uploads/`).
- Ke depan, Google Business Profile dan Search Console sangat membantu SEO lokal. Sitemap ada di `/sitemap.xml`.

## Struktur

- `server/utils/schema.ts`: definisi koleksi konten (tabel, validasi, dan form admin dibuat dari sini). Menambah field cukup di sini.
- `server/utils/settings.ts`: daftar pengaturan situs.
- `server/utils/seed.ts`: data contoh awal.
- `pages/`, `components/`, `layouts/`: tampilan publik. `pages/admin/`: panel admin.

## Batasan yang perlu diketahui

- Gambar diunggah apa adanya (tanpa resize otomatis); kompres foto besar dahulu. SVG sengaja tidak diizinkan.
- Rate limit login/formulir disimpan di memori (cukup untuk satu instance).
- Data permintaan pasien tersimpan di database. Batasi akses server dan berikan peran `operator` hanya kepada yang perlu.
- Klaim medis, izin, dan testimoni di website harus sesuai kenyataan. Bagian Legalitas dan Testimoni sengaja kosong/nonaktif sampai diisi.
