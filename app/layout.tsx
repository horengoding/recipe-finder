import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import './global.css';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'KulkasAI',
  description: 'Unggah foto bahan makanan, dapatkan resep praktis secara instan.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFBF7' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1030' },
  ],
};

// Dijalankan sebelum halaman tampil supaya tidak ada kedipan terang saat mode gelap aktif
const themeScript = `try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
