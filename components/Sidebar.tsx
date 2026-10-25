'use client';

import Link from 'next/link';
import { ChefHatIcon, HomeIcon, ImageIcon, ListIcon, SettingsIcon } from './icons';

const ITEMS = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/gallery', label: 'Gallery', Icon: ImageIcon },
  { href: '/list', label: 'List', Icon: ListIcon },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon },
];

export default function Sidebar({ pathname }: { pathname: string | null }) {
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : !!pathname && pathname.startsWith(href);

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 p-4 md:block">
      <div className="clay flex h-full flex-col gap-6 p-5">
        <Link href="/" className="flex items-center gap-3 rounded-2xl">
          <span className="clay-blue clay-xs grid h-11 w-11 place-items-center rounded-full text-white">
            <ChefHatIcon className="h-6 w-6" />
          </span>
          <span className="font-display text-xl font-semibold text-heading">KulkasAI</span>
        </Link>

        <Link
          href="/pick"
          className="clay-blue clay-press flex h-12 items-center justify-center gap-2 rounded-full font-display text-base font-semibold text-white"
        >
          <ChefHatIcon className="h-5 w-5" />
          Cari Resep
        </Link>

        <nav aria-label="Navigasi utama">
          <ul className="space-y-1.5">
            {ITEMS.map(({ href, label, Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-2xl px-3 text-base font-bold transition-colors ${
                      active
                        ? 'bg-royal-soft text-royal dark:text-peach'
                        : 'text-ink-soft hover:bg-royal-soft'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}