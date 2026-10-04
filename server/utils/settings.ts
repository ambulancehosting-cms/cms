// Pengaturan situs global. Semua nilai bersifat publik (dipakai di halaman web).

export interface SettingDef {
  key: string
  label: string
  type: 'text' | 'textarea' | 'markdown' | 'image' | 'color'
  group: string
  default: string
  help?: string
}

export const PLACEHOLDER_WA = '6281200000000'

export const settingDefs: SettingDef[] = [
  // Identitas
  { group: 'Identitas', key: 'site_name', label: 'Nama brand', type: 'text', default: 'Sigap Medika Ambulans' },
  { group: 'Identitas', key: 'legal_name', label: 'Nama badan usaha', type: 'text', default: 'PT Sigap Medika Utama', help: 'Tampil di footer dan halaman Tentang.' },
  { group: 'Identitas', key: 'tagline', label: 'Tagline', type: 'text', default: 'Layanan ambulans 24 jam: cepat, aman, dan terpercaya' },
  { group: 'Identitas', key: 'logo', label: 'Logo', type: 'image', default: '', help: 'Disarankan PNG transparan. Kosong = ikon palang medis.' },
  { group: 'Identitas', key: 'founded_year', label: 'Tahun berdiri', type: 'text', default: '' },

  // Kontak
  { group: 'Kontak', key: 'phone', label: 'Nomor telepon darurat', type: 'text', default: '0812-0000-0000', help: 'Format tampilan bebas. Dipakai untuk tombol telepon di seluruh situs.' },
  { group: 'Kontak', key: 'whatsapp', label: 'Nomor WhatsApp', type: 'text', default: PLACEHOLDER_WA, help: 'Format internasional tanpa + atau spasi, mis. 6281234567890. Satu tempat untuk semua tombol WhatsApp.' },
  { group: 'Kontak', key: 'wa_message', label: 'Pesan awal WhatsApp', type: 'text', default: 'Halo, saya butuh layanan ambulans. Mohon informasinya.' },
  { group: 'Kontak', key: 'email', label: 'Email', type: 'text', default: '' },
  { group: 'Kontak', key: 'address', label: 'Alamat', type: 'textarea', default: 'Jl. Contoh Raya No. 1, Surabaya, Jawa Timur' },
  { group: 'Kontak', key: 'hours', label: 'Jam operasional', type: 'text', default: 'Siaga 24 jam, setiap hari' },
  { group: 'Kontak', key: 'maps_embed', label: 'URL embed Google Maps', type: 'text', default: '', help: 'Dari Google Maps: Bagikan > Sematkan peta > salin isi src="..." saja.' },
  { group: 'Kontak', key: 'maps_link', label: 'Link Google Maps', type: 'text', default: '' },

  // Sosial media
  { group: 'Sosial Media', key: 'facebook', label: 'Facebook (URL)', type: 'text', default: '' },
  { group: 'Sosial Media', key: 'instagram', label: 'Instagram (URL)', type: 'text', default: '' },
  { group: 'Sosial Media', key: 'youtube', label: 'YouTube (URL)', type: 'text', default: '' },
  { group: 'Sosial Media', key: 'tiktok', label: 'TikTok (URL)', type: 'text', default: '' },

  // Tampilan
  { group: 'Tampilan', key: 'color_primary', label: 'Warna utama (biru)', type: 'color', default: '#0a4da2' },
  { group: 'Tampilan', key: 'color_dark', label: 'Warna biru tua', type: 'color', default: '#0b2a5b' },
  { group: 'Tampilan', key: 'color_accent', label: 'Warna aksen darurat', type: 'color', default: '#e5352b', help: 'Dipakai khusus untuk tombol telepon/darurat.' },

  // Beranda
  { group: 'Beranda', key: 'hero_badge', label: 'Label kecil hero', type: 'text', default: 'Siaga 24 jam · Setiap hari' },
  { group: 'Beranda', key: 'hero_title', label: 'Judul hero', type: 'text', default: 'Ambulans cepat dan aman, kapan pun Anda butuh' },
  { group: 'Beranda', key: 'hero_subtitle', label: 'Sub-judul hero', type: 'textarea', default: 'Antar pasien, ambulans gawat darurat, mobil jenazah, hingga standby event. Hubungi kami sekarang dan petugas kami segera merespons.' },
  { group: 'Beranda', key: 'hero_image', label: 'Gambar hero', type: 'image', default: '', help: 'Kosong = ilustrasi ambulans bawaan.' },
  { group: 'Beranda', key: 'home_about_title', label: 'Judul ringkasan tentang', type: 'text', default: 'Mitra transportasi medis yang bisa diandalkan' },
  { group: 'Beranda', key: 'home_about_text', label: 'Teks ringkasan tentang', type: 'textarea', default: 'Kami membantu keluarga dan institusi memindahkan pasien maupun jenazah dengan aman, tepat waktu, dan dengan komunikasi yang jelas dari awal hingga tiba di tujuan.' },
  { group: 'Beranda', key: 'cta_title', label: 'Judul CTA penutup', type: 'text', default: 'Butuh ambulans sekarang?' },
  { group: 'Beranda', key: 'cta_text', label: 'Teks CTA penutup', type: 'text', default: 'Hubungi kami kapan saja. Petugas siaga 24 jam untuk membantu Anda.' },

  // Tentang
  { group: 'Tentang', key: 'about_title', label: 'Judul halaman Tentang', type: 'text', default: 'Tentang Kami' },
  { group: 'Tentang', key: 'about_body', label: 'Profil perusahaan', type: 'markdown', default: 'Kami adalah penyedia layanan ambulans yang berfokus pada keselamatan dan kenyamanan pasien serta keluarga.\n\nGanti teks ini dengan profil perusahaan Anda: sejarah singkat, pengalaman, dan komitmen layanan.' },
  { group: 'Tentang', key: 'about_image', label: 'Foto tentang', type: 'image', default: '' },
  { group: 'Tentang', key: 'vision', label: 'Visi', type: 'textarea', default: '' },
  { group: 'Tentang', key: 'mission', label: 'Misi', type: 'markdown', default: '' },

  // Harga
  { group: 'Harga', key: 'price_note', label: 'Catatan halaman harga', type: 'textarea', default: 'Tarif di atas adalah perkiraan awal. Biaya akhir menyesuaikan jarak, jenis armada, kebutuhan tenaga medis, dan waktu keberangkatan. Hubungi kami untuk estimasi yang pasti.' },

  // SEO
  { group: 'SEO', key: 'site_url', label: 'Alamat situs (domain)', type: 'text', default: '', help: 'Mis. https://contoh.co.id. Dipakai untuk sitemap dan canonical.' },
  { group: 'SEO', key: 'seo_title', label: 'Judul SEO beranda', type: 'text', default: '' },
  { group: 'SEO', key: 'seo_description', label: 'Deskripsi SEO beranda', type: 'textarea', default: 'Sewa ambulans 24 jam untuk antar pasien, gawat darurat, mobil jenazah, dan standby event. Respon cepat dan armada terawat.' },
  { group: 'SEO', key: 'og_image', label: 'Gambar share (OG)', type: 'image', default: '' },

  // Footer
  { group: 'Footer', key: 'footer_text', label: 'Teks footer', type: 'textarea', default: 'Layanan transportasi medis dan jenazah yang siaga 24 jam.' },
]

export async function getSettings(): Promise<Record<string, string>> {
  const db = await getDb()
  const out: Record<string, string> = {}
  for (const d of settingDefs) out[d.key] = d.default
  const snap = await db.collection('settings').get()
  for (const r of snap.docs) if (r.id in out) out[r.id] = r.data().value ?? ''
  return out
}
