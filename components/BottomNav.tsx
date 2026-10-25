'use client';

import Link from 'next/link';
import { ChefHatIcon, HomeIcon, ImageIcon, ListIcon, SettingsIcon } from './icons';

// Layar penuh (Pilih Foto, Detail Resep) tidak memakai bottom nav, sesuai sketsa
export function shouldShowNav(pathname: string | null): boolean {
  if (!pathname) return true;
  return !(pathname.startsWith('/pick') || pathname.startsWith('/recipe'));
}

const LEFT = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/gallery', label: 'Gallery', Icon: ImageIcon },
];
const RIGHT = [
  { href: '/list', label: 'List', Icon: ListIcon },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon },
];

function NavItem({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: (p: { className?: string }) => React.JSX.Element;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-xs font-bold transition-colors ${
        active ? 'text-royal dark:text-peach' : 'text-ink-soft'
      }`}
    >
      <span
        className={`grid h-8 w-12 place-items-center rounded-full transition-colors ${
          active ? 'bg-royal-soft' : ''
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>
      {label}
    </Link>
  );
}

export default function BottomNav({ pathname }: { pathname: string | null }) {
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : !!pathname && pathname.startsWith(href);

  return (
    <nav
      aria-label="Navigasi utama"
      className="on-blue fixed inset-x-0 bottom-0 z-20 md:hidden"
    >
      <div className="clay safe-bottom mx-auto grid max-w-xl grid-cols-5 items-end rounded-b-none rounded-t-[2rem] px-2 pt-2">
        {LEFT.map((item) => (
          <NavItem key={item.href} {...item} active={isActive(item.href)} />
        ))}

        <div className="flex justify-center">
          <Link
            href="/pick"
            aria-label="Cari resep dari foto"
            className="clay-blue clay-press -mt-9 grid h-16 w-16 place-items-center rounded-full text-white"
          >
            <ChefHatIcon className="h-8 w-8" />
          </Link>
        </div>

        {RIGHT.map((item) => (
          <NavItem key={item.href} {...item} active={isActive(item.href)} />
        ))}
      </div>
    </nav>
  );
}
