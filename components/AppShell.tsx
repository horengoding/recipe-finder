'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import BottomNav, { shouldShowNav } from './BottomNav';
import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNav = shouldShowNav(pathname);

  return (
    <div className="relative min-h-dvh bg-cream text-ink">
      <Sidebar pathname={pathname} />

      <div className="md:pl-64">
        <div
          className={`mx-auto w-full max-w-5xl md:px-6 ${
            showNav ? 'pb-32 md:pb-10' : 'md:pb-10'
          }`}
        >
          {children}
    </div>
  </div>

  {showNav && <BottomNav pathname={pathname} />}
    </div>
  );
}
