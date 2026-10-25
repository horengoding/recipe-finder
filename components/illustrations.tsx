import { useId } from 'react';

type Props = { className?: string };

/* id gradient harus unik per instance; titik dua dari useId dibuang agar aman di url(#...) */
function useUid() {
  return useId().replace(/:/g, '');
}

export function FridgeIllustration({ className }: Props) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-body`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#3A58D0" />
          <stop offset="0.45" stopColor="#002395" />
          <stop offset="1" stopColor="#00156B" />
        </linearGradient>
        <linearGradient id={`${uid}-peach`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD08A" />
          <stop offset="1" stopColor="#FFB042" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="132" rx="36" ry="6" fill="#002395" opacity={0.18} />
      <rect x="24" y="8" width="72" height="118" rx="26" fill={`url(#${uid}-body)`} />
      <rect x="24" y="8" width="72" height="118" rx="26" fill="none" stroke="#fff" strokeOpacity={0.22} strokeWidth={2} />
      <path d="M33 54h54" stroke="#fff" strokeOpacity={0.28} strokeWidth={4} strokeLinecap="round" />
      <rect x="76" y="24" width="7" height="20" rx="3.5" fill={`url(#${uid}-peach)`} />
      <rect x="76" y="66" width="7" height="34" rx="3.5" fill={`url(#${uid}-peach)`} />
      <ellipse cx="42" cy="28" rx="8" ry="14" fill="#fff" opacity={0.22} transform="rotate(12 42 28)" />
    </svg>
  );
}

/* Wajan clay: pengganti gambar resep bila belum ada foto */
export function PanIllustration({ className }: Props) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A58D0" />
          <stop offset="1" stopColor="#002395" />
        </linearGradient>
        <linearGradient id={`${uid}-h`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD08A" />
          <stop offset="1" stopColor="#FFB042" />
        </linearGradient>
      </defs>
      <ellipse cx="58" cy="100" rx="34" ry="5" fill="#002395" opacity={0.15} />
      <rect x="78" y="52" width="34" height="11" rx="5.5" fill={`url(#${uid}-h)`} transform="rotate(-14 78 57)" />
      <ellipse cx="52" cy="64" rx="36" ry="26" fill={`url(#${uid}-b)`} />
      <ellipse cx="52" cy="60" rx="27" ry="17" fill="#fff" opacity={0.2} />
      <ellipse cx="40" cy="50" rx="7" ry="3.5" fill="#fff" opacity={0.45} transform="rotate(-20 40 50)" />
      <path d="M26 22v8M22 26h8" stroke="#FFB042" strokeWidth={3} strokeLinecap="round" />
      <path d="M96 30v6M93 33h6" stroke="#FFB042" strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}

/* Kamera + foto: kondisi kosong di Home */
export function CameraStackIllustration({ className }: Props) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A58D0" />
          <stop offset="1" stopColor="#002395" />
        </linearGradient>
        <linearGradient id={`${uid}-h`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD08A" />
          <stop offset="1" stopColor="#FFB042" />
        </linearGradient>
      </defs>
      <ellipse cx="86" cy="108" rx="52" ry="6" fill="#002395" opacity={0.15} />
      <g transform="rotate(-10 50 50)">
        <rect x="16" y="20" width="58" height="46" rx="11" fill="var(--royal-soft)" stroke="#002395" strokeOpacity={0.25} strokeWidth={2} />
        <path d="m24 56 14-13 10 9 8-7 10 11" fill="none" stroke="#002395" strokeOpacity={0.35} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="84" y="30" width="26" height="14" rx="7" fill={`url(#${uid}-b)`} />
      <rect x="62" y="38" width="86" height="64" rx="20" fill={`url(#${uid}-b)`} />
      <circle cx="105" cy="70" r="20" fill="#fff" opacity={0.25} />
      <circle cx="105" cy="70" r="13" fill={`url(#${uid}-h)`} />
      <circle cx="100" cy="65" r="3.6" fill="#fff" opacity={0.75} />
      <path d="M140 18v8M136 22h8" stroke="#FFB042" strokeWidth={3} strokeLinecap="round" />
      <path d="M32 84v6M29 87h6" stroke="#FFB042" strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}

/* Topi chef + hati: kondisi kosong di Gallery */
export function ChefHeartIllustration({ className }: Props) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A58D0" />
          <stop offset="1" stopColor="#002395" />
        </linearGradient>
        <linearGradient id={`${uid}-h`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD08A" />
          <stop offset="1" stopColor="#FFB042" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="var(--royal-soft)" />
      <g fill={`url(#${uid}-b)`}>
        <circle cx="45" cy="47" r="14" />
        <circle cx="60" cy="40" r="17" />
        <circle cx="75" cy="47" r="14" />
        <rect x="40" y="50" width="40" height="30" rx="10" />
      </g>
      <path d="M44 68h32" stroke="#fff" strokeOpacity={0.35} strokeWidth={4} strokeLinecap="round" />
      <ellipse cx="50" cy="38" rx="6" ry="9" fill="#fff" opacity={0.22} transform="rotate(14 50 38)" />
      <g transform="translate(66 66) scale(1.6)">
        <path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          fill={`url(#${uid}-h)`}
          stroke="#fff"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
