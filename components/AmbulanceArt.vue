<template>
  <svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi ambulans">
    <defs>
      <linearGradient id="amb-glow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".22" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="260" cy="150" rx="230" ry="130" fill="url(#amb-glow)" />
    <ellipse cx="260" cy="284" rx="200" ry="14" fill="#000" opacity=".18" />
    <!-- body -->
    <path d="M60 236V128a18 18 0 0 1 18-18h214a14 14 0 0 1 14 14v112z" fill="#fff" />
    <path d="M306 124h74a16 16 0 0 1 12 6l46 54a20 20 0 0 1 5 13v39h-137z" fill="#fff" />
    <path d="M320 138h58a8 8 0 0 1 6 3l34 40H320z" fill="#9cc3f2" />
    <rect x="60" y="212" width="392" height="24" rx="4" fill="var(--accent, #e5352b)" />
    <rect x="60" y="180" width="248" height="10" fill="#0a4da2" opacity=".85" />
    <!-- cross -->
    <g fill="var(--accent, #e5352b)">
      <rect x="150" y="128" width="30" height="66" rx="4" transform="translate(0 -6)" />
      <rect x="132" y="146" width="66" height="30" rx="4" transform="translate(0 -6)" />
    </g>
    <!-- siren -->
    <rect x="196" y="98" width="70" height="14" rx="5" fill="#0a4da2" />
    <rect x="206" y="88" width="24" height="12" rx="4" fill="#e5352b" />
    <rect x="234" y="88" width="24" height="12" rx="4" fill="#5da0ff" />
    <!-- wheels -->
    <g>
      <circle cx="138" cy="246" r="30" fill="#0b2a5b" /><circle cx="138" cy="246" r="13" fill="#dbe6f5" />
      <circle cx="384" cy="246" r="30" fill="#0b2a5b" /><circle cx="384" cy="246" r="13" fill="#dbe6f5" />
    </g>
    <rect x="446" y="206" width="18" height="12" rx="3" fill="#ffd166" />
  </svg>
</template>
