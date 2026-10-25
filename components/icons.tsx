type IconProps = { className?: string };

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const soft = { fill: 'currentColor', fillOpacity: 0.16 };

export function HeartIcon({
  filled = false,
  tone = 'peach',
  className,
}: IconProps & { filled?: boolean; tone?: 'peach' | 'blue' }) {
  const fill = tone === 'peach' ? 'var(--peach)' : 'var(--royal)';
  const stroke = tone === 'peach' ? 'var(--peach-deep)' : 'var(--royal)';
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        fill={filled ? fill : 'none'}
        stroke={filled ? stroke : 'currentColor'}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      {filled && (
        <path
          d="M6.2 8.6c.4-1.2 1.4-1.9 2.6-1.9"
          fill="none"
          stroke="#fff"
          strokeOpacity={0.75}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...soft} stroke="currentColor" strokeWidth={2.2} />
      <path d="M12 7.5V12l3 2" {...strokeProps} />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6.2 7.5h13.3l-1.4 6.6a2 2 0 0 1-2 1.6H9.6a2 2 0 0 1-2-1.6L6.2 7.5Z" {...soft} stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" />
      <path d="M3 4h2l1.2 3.5" {...strokeProps} />
      <circle cx="9.8" cy="19.2" r="1.5" fill="currentColor" />
      <circle cx="16.2" cy="19.2" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ChefHatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...soft} stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round">
        <path d="M7 14.5A4.5 4.5 0 0 1 6.6 5.6 4.5 4.5 0 0 1 12 3.5a4.5 4.5 0 0 1 5.4 2.1A4.5 4.5 0 0 1 17 14.5" />
        <rect x="7" y="14.5" width="10" height="6" rx="2" />
      </g>
    </svg>
  );
}

export function BulbIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.1V17h5v-1.1c0-.8.4-1.5 1.1-2.1A6 6 0 0 0 12 3Z"
        {...soft}
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <path d="M10 20.5h4" {...strokeProps} />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M8.6 6.5 9.8 4.5h4.4l1.2 2H18a3 3 0 0 1 3 3V17a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3h2.6Z"
        {...soft}
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.2" r="3.2" fill="none" stroke="currentColor" strokeWidth={2.2} />
    </svg>
  );
}

export function ImageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="4" {...soft} stroke="currentColor" strokeWidth={2.2} />
      <circle cx="9" cy="10" r="1.8" fill="currentColor" />
      <path d="m4.5 17 4.8-4.2 3.4 2.8 2.6-2.4 4.2 3.8" {...strokeProps} />
    </svg>
  );
}

export function SpinnerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={3.5} />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M14.5 6 8.5 12l6 6" {...strokeProps} strokeWidth={2.8} />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="m9.5 6 6 6-6 6" {...strokeProps} strokeWidth={2.6} />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="m6 9.5 6 6 6-6" {...strokeProps} strokeWidth={2.6} />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5.5 12.5 10 17l8.5-9.5" {...strokeProps} strokeWidth={3.2} />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" {...strokeProps} strokeWidth={2.6} />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" {...strokeProps} strokeWidth={2.6} />
    </svg>
  );
}

export function DotsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="5.5" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="18.5" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...soft} stroke="currentColor" strokeWidth={2.2} />
      <path d="M12 7.5v5" {...strokeProps} strokeWidth={2.6} />
      <circle cx="12" cy="16.3" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...soft} stroke="currentColor" strokeWidth={2.2} />
      <path d="M12 11v5.2" {...strokeProps} strokeWidth={2.6} />
      <circle cx="12" cy="7.9" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fillOpacity={0.25} fill="currentColor" stroke="currentColor" strokeWidth={2.2} />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" {...strokeProps} />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
        fill="currentColor"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.1.65-.21.65-.46v-1.7c-2.64.58-3.2-1.14-3.2-1.14-.43-1.1-1.06-1.4-1.06-1.4-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.85 1.47 2.24 1.05 2.78.8.09-.62.34-1.05.6-1.29-2.1-.24-4.32-1.06-4.32-4.7 0-1.04.37-1.89.98-2.55-.1-.24-.42-1.22.1-2.54 0 0 .8-.26 2.62.97a9 9 0 0 1 4.78 0c1.82-1.23 2.62-.97 2.62-.97.52 1.32.2 2.3.1 2.54.61.66.98 1.51.98 2.55 0 3.65-2.22 4.46-4.33 4.7.35.3.65.89.65 1.8v2.67c0 .25.17.57.66.46A9.5 9.5 0 0 0 12 2.5Z"
        {...soft}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 11.2 12 4.5l8 6.7V19a1.5 1.5 0 0 1-1.5 1.5h-3.8v-5.2H9.3v5.2H5.5A1.5 1.5 0 0 1 4 19v-7.8Z"
        {...soft}
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ListIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M10 7h9.5M10 12h9.5M10 17h9.5" {...strokeProps} />
      <circle cx="5.4" cy="7" r="1.4" fill="currentColor" />
      <circle cx="5.4" cy="12" r="1.4" fill="currentColor" />
      <circle cx="5.4" cy="17" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" strokeWidth={2.6} strokeDasharray="2.4 5.14" />
      <circle cx="12" cy="12" r="7" {...soft} stroke="currentColor" strokeWidth={2.2} />
      <circle cx="12" cy="12" r="2.8" fill="none" stroke="currentColor" strokeWidth={2.2} />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6.5 7.5 7.3 18a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8l.8-10.5Z" {...soft} stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" />
      <path d="M4.5 7.5h15M9.5 7.5V5.8A1.3 1.3 0 0 1 10.8 4.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7" {...strokeProps} />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="3" {...soft} stroke="currentColor" strokeWidth={2.2} />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" {...strokeProps} />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.7" {...soft} stroke="currentColor" strokeWidth={2.2} />
      <path d="M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5" {...strokeProps} />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
}

export function SortIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 7h9M4 12h6M4 17h3" {...strokeProps} />
      <path d="M17.5 6v12m0 0-3-3m3 3 3-3" {...strokeProps} />
    </svg>
  );
}
