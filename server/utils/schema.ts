// Definisi koleksi konten. Satu sumber kebenaran untuk: tabel database,
// validasi API, dan form otomatis di panel admin.

export type FieldType =
  | 'text' | 'textarea' | 'markdown' | 'number' | 'image'
  | 'select' | 'lines' | 'boolean' | 'date'

export interface Field {
  key: string
  label: string
  type: FieldType
  required?: boolean
  options?: string[]
  help?: string
  placeholder?: string
  inList?: boolean
}

export interface CollectionDef {
  name: string
  label: string
  singular: string
  group: string
  titleField: string
  fields: Field[]
  hasSlug?: boolean
  orderBy?: { key: string; dir: 'asc' | 'desc' }
  noReorder?: boolean
  hint?: string
}

export const ICONS = ['heart-pulse', 'cross', 'truck', 'building', 'calendar', 'heart', 'users', 'shield', 'clock', 'map-pin', 'star']

export const collections: Record<string, CollectionDef> = {
  services: {
    name: 'services', label: 'Layanan', singular: 'Layanan', group: 'Konten', titleField: 'title', hasSlug: true,
    hint: 'Setiap layanan punya halaman detail sendiri (/layanan/slug).',
    fields: [
      { key: 'title', label: 'Nama layanan', type: 'text', required: true, inList: true },
      { key: 'slug', label: 'Slug URL', type: 'text', help: 'Kosongkan untuk dibuat otomatis dari nama.' },
      { key: 'icon', label: 'Ikon', type: 'select', options: ICONS },
      { key: 'summary', label: 'Ringkasan', type: 'textarea', required: true, inList: true },
      { key: 'body', label: 'Isi halaman detail', type: 'markdown' },
      { key: 'image', label: 'Gambar', type: 'image' },
      { key: 'seo_title', label: 'SEO: judul', type: 'text' },
      { key: 'seo_description', label: 'SEO: deskripsi', type: 'textarea' },
    ],
  },
  fleet: {
    name: 'fleet', label: 'Armada', singular: 'Unit armada', group: 'Konten', titleField: 'name',
    fields: [
      { key: 'name', label: 'Nama unit', type: 'text', required: true, inList: true },
      { key: 'type', label: 'Jenis', type: 'select', options: ['Ambulans Transport', 'Ambulans Gawat Darurat', 'Ambulans ICU', 'Ambulans VIP', 'Mobil Jenazah', 'Lainnya'], inList: true },
      { key: 'capacity', label: 'Kapasitas', type: 'text', placeholder: 'mis. 1 pasien + 2 pendamping' },
      { key: 'description', label: 'Deskripsi', type: 'textarea' },
      { key: 'features', label: 'Fasilitas', type: 'lines', help: 'Satu fasilitas per baris.' },
      { key: 'image', label: 'Foto unit', type: 'image', help: 'Gunakan foto armada asli untuk membangun kepercayaan.' },
    ],
  },
  prices: {
    name: 'prices', label: 'Daftar Harga', singular: 'Tarif', group: 'Konten', titleField: 'title',
    fields: [
      { key: 'title', label: 'Rute / zona / paket', type: 'text', required: true, inList: true },
      { key: 'category', label: 'Kategori', type: 'select', options: ['Antar Pasien', 'Jenazah', 'Standby Event', 'Perusahaan', 'Lainnya'], inList: true },
      { key: 'price', label: 'Harga mulai dari (Rp)', type: 'number', help: 'Isi 0 atau kosongkan untuk menampilkan "Hubungi kami".', inList: true },
      { key: 'unit', label: 'Satuan', type: 'text', placeholder: 'mis. per trip, per hari' },
      { key: 'note', label: 'Catatan', type: 'text' },
    ],
  },
  areas: {
    name: 'areas', label: 'Area Layanan', singular: 'Area', group: 'Konten', titleField: 'name', hasSlug: true,
    hint: 'Satu halaman per area membantu SEO lokal (mis. "Ambulans Surabaya").',
    fields: [
      { key: 'name', label: 'Nama kota / kabupaten', type: 'text', required: true, inList: true },
      { key: 'slug', label: 'Slug URL', type: 'text', help: 'Kosongkan untuk dibuat otomatis.' },
      { key: 'intro', label: 'Kalimat pembuka', type: 'textarea', inList: true },
      { key: 'body', label: 'Isi halaman area', type: 'markdown' },
      { key: 'seo_title', label: 'SEO: judul', type: 'text' },
      { key: 'seo_description', label: 'SEO: deskripsi', type: 'textarea' },
    ],
  },
  reasons: {
    name: 'reasons', label: 'Keunggulan', singular: 'Keunggulan', group: 'Konten', titleField: 'title',
    fields: [
      { key: 'title', label: 'Judul', type: 'text', required: true, inList: true },
      { key: 'description', label: 'Penjelasan singkat', type: 'textarea', required: true, inList: true },
      { key: 'icon', label: 'Ikon', type: 'select', options: ICONS },
    ],
  },
  steps: {
    name: 'steps', label: 'Alur Pemesanan', singular: 'Langkah', group: 'Konten', titleField: 'title',
    fields: [
      { key: 'title', label: 'Judul langkah', type: 'text', required: true, inList: true },
      { key: 'description', label: 'Penjelasan', type: 'textarea', inList: true },
    ],
  },
  stats: {
    name: 'stats', label: 'Angka Kepercayaan', singular: 'Angka', group: 'Konten', titleField: 'label',
    hint: 'Tampil sebagai strip angka di beranda. Isi dengan data yang benar.',
    fields: [
      { key: 'value', label: 'Angka / teks besar', type: 'text', required: true, inList: true, placeholder: 'mis. 24/7' },
      { key: 'label', label: 'Keterangan', type: 'text', required: true, inList: true },
    ],
  },
  legal: {
    name: 'legal', label: 'Legalitas & Izin', singular: 'Dokumen izin', group: 'Konten', titleField: 'title',
    hint: 'Tampil di beranda dan halaman Tentang bila ada yang aktif. Isi hanya izin yang benar-benar dimiliki.',
    fields: [
      { key: 'title', label: 'Nama izin', type: 'text', required: true, inList: true },
      { key: 'number', label: 'Nomor', type: 'text', inList: true },
      { key: 'image', label: 'Scan / foto dokumen', type: 'image' },
    ],
  },
  testimonials: {
    name: 'testimonials', label: 'Testimoni', singular: 'Testimoni', group: 'Konten', titleField: 'name',
    hint: 'Hanya tampilkan testimoni asli dari pelanggan yang sudah memberi izin.',
    fields: [
      { key: 'name', label: 'Nama', type: 'text', required: true, inList: true },
      { key: 'role', label: 'Keterangan', type: 'text', placeholder: 'mis. Keluarga pasien, Sidoarjo' },
      { key: 'quote', label: 'Isi testimoni', type: 'textarea', required: true, inList: true },
      { key: 'rating', label: 'Rating (1-5)', type: 'number' },
    ],
  },
  gallery: {
    name: 'gallery', label: 'Galeri', singular: 'Foto', group: 'Konten', titleField: 'title',
    fields: [
      { key: 'title', label: 'Judul', type: 'text', required: true, inList: true },
      { key: 'image', label: 'Foto', type: 'image', required: true },
      { key: 'caption', label: 'Keterangan', type: 'text' },
    ],
  },
  faqs: {
    name: 'faqs', label: 'FAQ', singular: 'Pertanyaan', group: 'Konten', titleField: 'question',
    fields: [
      { key: 'question', label: 'Pertanyaan', type: 'text', required: true, inList: true },
      { key: 'answer', label: 'Jawaban', type: 'textarea', required: true, inList: true },
    ],
  },
  posts: {
    name: 'posts', label: 'Artikel', singular: 'Artikel', group: 'Konten', titleField: 'title', hasSlug: true,
    orderBy: { key: 'published_at', dir: 'desc' }, noReorder: true,
    fields: [
      { key: 'title', label: 'Judul', type: 'text', required: true, inList: true },
      { key: 'slug', label: 'Slug URL', type: 'text', help: 'Kosongkan untuk dibuat otomatis dari judul.' },
      { key: 'published_at', label: 'Tanggal terbit', type: 'date', inList: true },
      { key: 'excerpt', label: 'Ringkasan', type: 'textarea' },
      { key: 'body', label: 'Isi artikel', type: 'markdown' },
      { key: 'image', label: 'Gambar sampul', type: 'image' },
      { key: 'seo_title', label: 'SEO: judul', type: 'text' },
      { key: 'seo_description', label: 'SEO: deskripsi', type: 'textarea' },
    ],
  },
}

export const PUBLIC_COLLECTIONS = Object.keys(collections)

export function slugify(s: string): string {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
