'use client';

import { useEffect, useState } from 'react';
import { useFavorites, usePhotos } from '@/lib/hooks';
import {
  MAX_ANALYSIS,
  MAX_HOME_PINS,
  clearAllLocalData,
  getAnalysisCount,
  getPinnedCount,
} from '@/lib/storage';
import {
  ChevronDownIcon,
  GithubIcon,
  InfoIcon,
  LockIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from '@/components/icons';
import Switch from '@/components/Switch';

const APP_VERSION = '1.0.0'; // ubah manual setiap rilis baru

type Panel = 'privasi' | 'tentang' | null;

export default function SettingsPage() {
  const { favorites, refresh } = useFavorites();
  const { photos, refresh: refreshPhotos } = usePhotos();
  const [dark, setDark] = useState(false);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState<Panel>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    setCount(getAnalysisCount());
  }, []);

  const toggleDark = (next: boolean) => {
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* abaikan */
    }
    setDark(next);
  };

  const handleClearAll = () => {
    if (
      !window.confirm(
        'Hapus semua resep favorit, foto masakan, dan hasil pencarian dari perangkat ini? Tindakan ini tidak bisa dibatalkan.',
      )
    )
      return;
    clearAllLocalData();
    refresh();
    refreshPhotos();
  };

  const photoCount = Object.keys(photos).length;
  const toggle = (panel: Exclude<Panel, null>) => setOpen((cur) => (cur === panel ? null : panel));

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-5 pb-4 pt-6">
      <h1 className="font-display text-3xl font-semibold text-heading">Pengaturan</h1>

      {/* Akun: dikerjakan paling akhir */}
      <section className="clay flex items-center gap-4 p-5" aria-label="Akun">
        <span className="clay-well clay-xs grid h-16 w-16 shrink-0 place-items-center rounded-full text-heading">
          <UserIcon className="h-8 w-8" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold text-heading">Tamu</p>
          <p className="text-sm text-ink-soft">Foto profil, nama, dan email</p>
        </div>
        <span className="clay-chip shrink-0 bg-peach-soft px-3 py-1 text-xs font-bold text-peach-soft-ink">
          Segera hadir
        </span>
      </section>

      <section className="clay-sm space-y-4 p-5" aria-label="Tampilan">
        <div className="flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-royal-soft text-royal-soft-ink">
            {dark ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold text-heading">Tampilan</p>
            <p className="text-sm text-ink-soft">Mode terang / gelap</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-royal/10 pt-4">
          <span className="text-base font-semibold text-ink">Mode gelap</span>
          <Switch checked={dark} onChange={toggleDark} label="Mode gelap" />
        </div>
      </section>

      <section className="clay-sm p-2" aria-label="Privasi">
        <button
          type="button"
          onClick={() => toggle('privasi')}
          aria-expanded={open === 'privasi'}
          className="flex w-full items-center gap-4 rounded-2xl p-3 text-left"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-royal-soft text-royal-soft-ink">
            <LockIcon className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-semibold text-heading">Privasi</span>
            <span className="block text-sm text-ink-soft">Data, penyimpanan, dan keamanan</span>
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${
              open === 'privasi' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open === 'privasi' && (
          <div className="space-y-4 px-3 pb-4 pt-1 text-sm text-ink">
            <p>
              Resep favorit dan foto masakan disimpan di perangkat ini saja (localStorage browser)
              dan tidak diunggah ke server.
            </p>
            <ul className="clay-well space-y-1.5 p-4 font-semibold">
              <li>Resep favorit: {favorites.length}</li>
              <li>Foto masakan: {photoCount}</li>
              <li>
                Resep andalan di Home: {getPinnedCount(photos)} / {MAX_HOME_PINS}
              </li>
              <li>
                Kuota analisis hari ini: {Math.max(0, MAX_ANALYSIS - count)} / {MAX_ANALYSIS}
              </li>
            </ul>
            <button
              type="button"
              onClick={handleClearAll}
              className="clay-sm clay-press flex min-h-12 w-full items-center justify-center rounded-full bg-danger px-4 font-bold text-danger-ink"
            >
              Hapus semua data di perangkat ini
            </button>
          </div>
        )}
      </section>

      <section className="clay-sm p-2" aria-label="Tentang">
        <button
          type="button"
          onClick={() => toggle('tentang')}
          aria-expanded={open === 'tentang'}
          className="flex w-full items-center gap-4 rounded-2xl p-3 text-left"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-royal-soft text-royal-soft-ink">
            <InfoIcon className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-semibold text-heading">Tentang</span>
            <span className="block text-sm text-ink-soft">Versi aplikasi &amp; credits</span>
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${
              open === 'tentang' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open === 'tentang' && (
          <div className="space-y-2 px-3 pb-4 pt-1 text-sm text-ink">
            <p className="font-semibold">KulkasAI · versi {APP_VERSION}</p>
            <p>Buat bahan masakan di kulkasmu jadi ide resep yang menarik.</p>
          </div>
        )}
      </section>

      <footer className="pt-4">
        <p className="clay-chip mx-auto flex w-fit items-center gap-1.5 bg-royal-soft px-4 py-1.5 text-xs font-semibold text-royal-soft-ink">
          © 2026 KulkasAI
          <span className="text-ink-soft">·</span>
          <GithubIcon className="h-4 w-4" />
          @horengoding
        </p>
      </footer>
    </div>
  );
}
