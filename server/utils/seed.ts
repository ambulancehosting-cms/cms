// Data contoh. Ini konten PLACEHOLDER untuk template: klien wajib menggantinya
// lewat panel admin sebelum go-live (lihat checklist di dashboard).

export const seedData: Record<string, any[]> = {
  services: [
    {
      title: 'Ambulans Antar Pasien', slug: 'ambulans-antar-pasien', icon: 'heart-pulse',
      summary: 'Antar-jemput pasien dari rumah ke rumah sakit, pindah rumah sakit, atau pulang rawat, dalam maupun luar kota.',
      body: '## Cocok untuk\n\n- Pasien pulang rawat yang perlu diantar ke rumah\n- Pindah rumah sakit atau rujukan antar fasilitas kesehatan\n- Kontrol rutin, terapi, atau dialisis yang membutuhkan kendaraan berbaring\n\n## Yang kami sediakan\n\n- Armada bersih dengan brankar dan perlengkapan dasar\n- Pengemudi berpengalaman\n- Pendamping medis bila diperlukan (sampaikan saat memesan)\n\n## Cara memesan\n\nHubungi kami melalui WhatsApp atau telepon, sebutkan lokasi jemput, tujuan, dan kondisi pasien. Kami konfirmasi armada dan estimasi biaya di awal.',
      seo_title: 'Sewa Ambulans Antar Pasien 24 Jam', seo_description: 'Layanan ambulans antar-jemput pasien dalam dan luar kota, siaga 24 jam.',
    },
    {
      title: 'Ambulans Gawat Darurat', slug: 'ambulans-gawat-darurat', icon: 'cross',
      summary: 'Respons cepat untuk kondisi darurat dengan armada yang siap bergerak dan petugas terlatih.',
      body: '## Kapan dibutuhkan\n\nUntuk kondisi yang memerlukan penanganan dan transportasi segera. Dalam kondisi yang mengancam nyawa, tetap hubungi layanan darurat setempat lebih dulu.\n\n## Yang kami sediakan\n\n- Armada siaga 24 jam\n- Petugas terlatih\n- Koordinasi dengan rumah sakit tujuan\n\n## Cara memesan\n\nTelepon langsung nomor darurat kami agar petugas dapat segera memproses.',
    },
    {
      title: 'Mobil Jenazah', slug: 'mobil-jenazah', icon: 'heart',
      summary: 'Pengantaran jenazah dengan hormat dan tepat waktu, dalam kota maupun antar kota.',
      body: '## Layanan\n\n- Pengantaran jenazah dari rumah sakit atau rumah duka ke tempat pemakaman\n- Pengantaran antar kota dan antar provinsi\n- Bantuan koordinasi keberangkatan\n\n## Yang perlu disiapkan\n\nSurat keterangan dari rumah sakit atau pihak berwenang sesuai kebutuhan perjalanan. Tim kami akan membantu memberi tahu dokumen yang diperlukan.',
    },
    {
      title: 'Ambulans Perusahaan & Proyek', slug: 'ambulans-perusahaan', icon: 'building',
      summary: 'Ambulans siaga untuk area kerja, proyek konstruksi, pabrik, dan kebutuhan K3 perusahaan.',
      body: '## Cocok untuk\n\n- Proyek konstruksi dan pertambangan\n- Pabrik dan area industri\n- Kontrak harian, mingguan, atau bulanan\n\nSampaikan durasi dan lokasi proyek untuk mendapatkan penawaran.',
    },
    {
      title: 'Standby Event', slug: 'standby-event', icon: 'calendar',
      summary: 'Ambulans dan petugas siaga di lokasi acara: konser, olahraga, pernikahan, dan kegiatan massa.',
      body: '## Cocok untuk\n\n- Konser, festival, dan pertandingan olahraga\n- Acara perusahaan dan kegiatan sekolah\n- Fun run, jalan sehat, dan sepeda santai\n\nSampaikan tanggal, lokasi, perkiraan jumlah peserta, dan durasi acara.',
    },
    {
      title: 'Ambulans Antar Kota', slug: 'ambulans-antar-kota', icon: 'truck',
      summary: 'Perjalanan jarak jauh antar kota dan antar provinsi dengan armada dan pengemudi yang siap.',
      body: '## Layanan\n\n- Antar pasien lintas kota dan provinsi\n- Perjalanan pulang-pergi sesuai jadwal\n- Estimasi biaya jelas di depan sesuai jarak\n\nSebutkan kota asal dan tujuan untuk mendapatkan estimasi.',
    },
  ],
  fleet: [
    { name: 'Ambulans Transport', type: 'Ambulans Transport', capacity: '1 pasien + 2 pendamping', description: 'Untuk antar-jemput pasien dan pindah rumah sakit.', features: 'Brankar pasien\nTabung oksigen\nKursi pendamping\nAC' },
    { name: 'Ambulans Gawat Darurat', type: 'Ambulans Gawat Darurat', capacity: '1 pasien + 2 petugas', description: 'Untuk kondisi darurat dengan respons cepat.', features: 'Brankar dan perlengkapan dasar\nTabung oksigen\nSirine dan lampu rotator\nAC' },
    { name: 'Mobil Jenazah', type: 'Mobil Jenazah', capacity: '1 jenazah + pendamping', description: 'Pengantaran jenazah dalam dan luar kota.', features: 'Ruang jenazah bersih\nKursi pendamping keluarga\nAC' },
    { name: 'Ambulans VIP', type: 'Ambulans VIP', capacity: '1 pasien + pendamping', description: 'Kenyamanan lebih untuk perjalanan jauh.', features: 'Kabin luas dan nyaman\nBrankar\nAC' },
  ],
  prices: [
    { title: 'Dalam kota (maks. 15 km)', category: 'Antar Pasien', price: 350000, unit: 'per trip', note: 'Contoh tarif, ganti sesuai kebijakan Anda' },
    { title: 'Luar kota (per km)', category: 'Antar Pasien', price: 7000, unit: 'per km', note: 'Contoh tarif' },
    { title: 'Dalam kota (maks. 15 km)', category: 'Jenazah', price: 400000, unit: 'per trip', note: 'Contoh tarif' },
    { title: 'Standby event (4 jam)', category: 'Standby Event', price: 0, unit: '', note: 'Tergantung lokasi dan kebutuhan petugas' },
    { title: 'Kontrak proyek', category: 'Perusahaan', price: 0, unit: '', note: 'Penawaran khusus per proyek' },
  ],
  areas: [
    { name: 'Surabaya', slug: 'surabaya', intro: 'Layanan ambulans untuk seluruh wilayah Kota Surabaya, siaga 24 jam.', body: 'Kami melayani antar pasien, gawat darurat, dan mobil jenazah di seluruh kecamatan di Surabaya, termasuk rujukan antar rumah sakit.' },
    { name: 'Sidoarjo', slug: 'sidoarjo', intro: 'Ambulans siaga untuk wilayah Sidoarjo dan sekitarnya.', body: 'Layanan tersedia untuk seluruh wilayah Kabupaten Sidoarjo, termasuk perjalanan ke Surabaya dan kota lain.' },
    { name: 'Gresik', slug: 'gresik', intro: 'Ambulans dan mobil jenazah untuk wilayah Gresik.', body: 'Kami melayani wilayah Kabupaten Gresik, termasuk kawasan industri dan pelabuhan.' },
    { name: 'Mojokerto', slug: 'mojokerto', intro: 'Layanan ambulans untuk Mojokerto dan sekitarnya.', body: 'Tersedia layanan antar pasien dan mobil jenazah dari dan menuju Mojokerto.' },
  ],
  reasons: [
    { title: 'Respons cepat', description: 'Petugas siaga 24 jam dan langsung membalas WhatsApp maupun telepon.', icon: 'clock' },
    { title: 'Armada terawat', description: 'Unit bersih, rutin diservis, dan dilengkapi perlengkapan sesuai jenis layanan.', icon: 'shield' },
    { title: 'Petugas berpengalaman', description: 'Pengemudi dan pendamping terbiasa menangani perjalanan pasien dan jenazah.', icon: 'users' },
    { title: 'Biaya transparan', description: 'Estimasi disampaikan di awal sebelum armada berangkat.', icon: 'star' },
  ],
  steps: [
    { title: 'Hubungi kami', description: 'Telepon atau chat WhatsApp. Sebutkan lokasi jemput, tujuan, dan jenis layanan.' },
    { title: 'Konfirmasi & estimasi', description: 'Petugas mengonfirmasi armada yang tersedia beserta estimasi biaya dan waktu tiba.' },
    { title: 'Armada berangkat', description: 'Ambulans meluncur ke lokasi Anda dan mengantar sampai tujuan dengan aman.' },
  ],
  stats: [
    { value: '24/7', label: 'Siaga setiap hari' },
    { value: '6', label: 'Jenis layanan' },
    { value: '4', label: 'Area layanan utama' },
  ],
  legal: [
    { title: 'Izin operasional (contoh)', number: 'Isi nomor izin Anda', active: 0 },
  ],
  faqs: [
    { question: 'Bagaimana cara memesan ambulans?', answer: 'Hubungi kami lewat WhatsApp atau telepon. Sebutkan lokasi jemput, tujuan, jenis layanan, dan kondisi pasien. Petugas akan mengonfirmasi armada dan estimasi biaya.' },
    { question: 'Berapa lama ambulans tiba di lokasi?', answer: 'Tergantung jarak dan kondisi lalu lintas. Petugas kami akan menyampaikan perkiraan waktu tiba saat konfirmasi pemesanan.' },
    { question: 'Berapa biaya sewa ambulans?', answer: 'Biaya menyesuaikan jarak, jenis armada, dan kebutuhan tenaga medis. Lihat halaman Daftar Harga untuk perkiraan awal, lalu hubungi kami untuk estimasi pasti.' },
    { question: 'Apakah ambulans dilengkapi peralatan medis?', answer: 'Setiap armada dilengkapi perlengkapan sesuai jenisnya. Sampaikan kebutuhan Anda (misalnya oksigen) saat memesan agar kami siapkan.' },
    { question: 'Apakah tersedia pendamping tenaga medis?', answer: 'Tersedia sesuai kebutuhan. Mohon informasikan kondisi pasien saat memesan supaya kami menyiapkan pendamping yang sesuai.' },
    { question: 'Apakah melayani luar kota?', answer: 'Ya. Kami melayani perjalanan dalam kota, antar kota, dan antar provinsi. Sebutkan kota tujuan untuk mendapatkan estimasi.' },
  ],
  posts: [
    {
      title: 'Kapan Sebaiknya Memanggil Ambulans?', slug: 'kapan-memanggil-ambulans', published_at: '2026-01-10',
      excerpt: 'Kenali situasi yang membutuhkan ambulans dan informasi apa yang perlu disiapkan saat menelepon.',
      body: '## Jangan menunda saat darurat\n\nJika seseorang tidak sadarkan diri, sesak napas berat, mengalami nyeri dada hebat, atau perdarahan yang tidak berhenti, segera cari bantuan medis darurat.\n\n## Informasi yang perlu disiapkan\n\n- Lokasi lengkap dan patokan yang mudah dikenali\n- Kondisi pasien saat ini\n- Rumah sakit tujuan, bila sudah ada\n- Nomor yang dapat dihubungi\n\nMenyampaikan informasi ini di awal membantu petugas menyiapkan armada dan perlengkapan yang tepat.',
      seo_title: 'Kapan Sebaiknya Memanggil Ambulans?', seo_description: 'Panduan singkat kapan memanggil ambulans dan informasi yang perlu disiapkan.',
    },
    {
      title: 'Persiapan Memesan Mobil Jenazah', slug: 'persiapan-memesan-mobil-jenazah', published_at: '2026-01-05',
      excerpt: 'Hal-hal yang perlu disiapkan keluarga saat memesan pengantaran jenazah, dalam maupun luar kota.',
      body: '## Yang perlu diketahui\n\n- Lokasi jemput dan lokasi tujuan\n- Perkiraan waktu keberangkatan\n- Jumlah keluarga yang akan menyertai\n\n## Dokumen\n\nUntuk perjalanan antar kota, biasanya diperlukan surat keterangan dari rumah sakit atau pihak berwenang. Tanyakan kepada petugas kami agar tidak ada yang terlewat.\n\nKami berupaya membantu keluarga dengan tenang, hormat, dan tepat waktu.',
    },
  ],
}
