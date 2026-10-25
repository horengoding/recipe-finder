'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Recipe } from '@/lib/favorites';
import { useFavorites, usePhotos, usePickedPhoto } from '@/lib/hooks';
import { MAX_HOME_PINS, setPendingImage } from '@/lib/storage';
import {
  AlertIcon,
  CameraIcon,
  ChefHatIcon,
  ChevronRightIcon,
  HeartIcon,
  ImageIcon,
  SpinnerIcon,
  UserIcon,
} from '@/components/icons';
import { CameraStackIllustration } from '@/components/illustrations';

function HomeCard({ recipe, photo, large }: { recipe: Recipe; photo: string; large: boolean }) {
  return (
    <Link
      href={`/recipe/${encodeURIComponent(recipe.id)}`}
      className="clay clay-press block overflow-hidden p-2"
    >
      <div className="relative">
        <img
          src={photo}
          alt={`Foto masakan ${recipe.title}`}
          className={`w-full rounded-[1.5rem] object-cover ${large ? 'h-48 md:h-40' : 'h-32 md:h-40'}`}
        />
        <span className="clay-peach clay-xs absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full">
          <HeartIcon filled tone="blue" className="h-4 w-4" />
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 px-2.5 py-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-heading">
            {recipe.title}
          </h3>
          <p className="text-xs text-ink-soft">
            {recipe.time} · {recipe.difficulty}
          </p>
        </div>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
      </div>
    </Link>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { photos } = usePhotos();

  // Foto dikirim lewat sessionStorage ke layar "Pilih Sumber Foto" untuk dianalisis
  const picker = usePickedPhoto((dataUrl) => {
    setPendingImage(dataUrl);
    router.push('/pick');
  });

  const featured = useMemo(
    () =>
      favorites
        .filter((r) => photos[r.id]?.showOnHome)
        .slice(0, MAX_HOME_PINS)
        .map((r) => ({ recipe: r, photo: photos[r.id].photo })),
    [favorites, photos],
  );

  return (
    <div className="space-y-7 pb-4">
      <header className="flex items-center justify-between gap-4 px-5 pt-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-heading">Halo!</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Masak jadi lebih mudah, mulai dari foto bahan masakanmu.
          </p>
        </div>
        <Link
          href="/settings"
          aria-label="Buka pengaturan"
          className="clay-sm clay-press grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface text-heading"
        >
          <UserIcon className="h-6 w-6" />
        </Link>
      </header>

      <section className="on-blue clay-blue mx-5 space-y-4 p-5 text-center">
        <span className="clay-peach clay-xs mx-auto grid h-14 w-14 place-items-center rounded-full">
          <ChefHatIcon className="h-7 w-7" />
        </span>
        <div className="space-y-1">
          <h2 className="font-display text-2xl font-semibold text-white">Cari resep sekarang</h2>
          <p className="text-sm text-white/85">
            Ambil foto bahan dan bumbu, atau pilih dari galeri.
          </p>
        </div>

        <div className="mx-auto flex max-w-md gap-3">
          <label className="clay-field clay-sm clay-press flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-surface text-sm font-bold text-heading">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={picker.onChange}
              className="sr-only"
            />
            <CameraIcon className="h-5 w-5" />
            Kamera
          </label>
          <label className="clay-field clay-sm clay-press flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-surface text-sm font-bold text-heading">
            <input
              type="file"
              accept="image/*"
              onChange={picker.onChange}
              className="sr-only"
            />
            <ImageIcon className="h-5 w-5" />
            Galeri
          </label>
        </div>

        {picker.busy && (
          <p role="status" className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
            <SpinnerIcon className="h-4 w-4 animate-spin" /> Menyiapkan foto...
          </p>
        )}
      </section>

      {picker.error && (
        <div
          role="alert"
          className="clay-sm mx-5 flex items-center gap-2.5 bg-danger p-4 text-sm font-semibold text-danger-ink"
        >
          <AlertIcon className="h-5 w-5 shrink-0" />
          {picker.error}
        </div>
      )}

      <section className="space-y-4 px-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-heading">Masakan Andalanmu</h2>
          {featured.length > 0 && (
            <Link
              href="/gallery"
              className="flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-bold text-heading"
            >
              Lihat semua <ChevronRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>

        {featured.length === 0 ? (
          <div className="clay-well space-y-3 px-6 py-8 text-center">
            <CameraStackIllustration className="mx-auto h-28 w-40" />
            <p className="font-display text-base font-semibold text-heading">
              Belum ada masakan andalanmu yang ditampilkan
            </p>
            <p className="text-sm text-ink-soft">
              Tambahkan foto hasil masakan di salah satu resep Gallery, lalu aktifkan “Tampilkan di
              Home” untuk ditampilkan di sini (maksimal {MAX_HOME_PINS} resep andalan).
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <HomeCard recipe={featured[0].recipe} photo={featured[0].photo} large />
            {featured.length > 1 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {featured.slice(1).map(({ recipe, photo }) => (
                  <HomeCard key={recipe.id} recipe={recipe} photo={photo} large={false} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
