'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Recipe } from '@/lib/favorites';
import { useFavorites, usePhotos } from '@/lib/hooks';
import { toggleFavoriteWithCleanup } from '@/lib/storage';
import { HeartIcon, SortIcon } from '@/components/icons';
import { ChefHeartIllustration, PanIllustration } from '@/components/illustrations';

type SortMode = 'newest' | 'az';

export default function GalleryPage() {
  const { favorites, refresh, ready } = useFavorites();
  const { photos, refresh: refreshPhotos } = usePhotos();
  const [sort, setSort] = useState<SortMode>('newest');

  const sorted = useMemo(() => {
    const list = [...favorites];
    return sort === 'newest'
      ? list.reverse()
      : list.sort((a, b) => a.title.localeCompare(b.title, 'id'));
  }, [favorites, sort]);

  const handleUnstar = (recipe: Recipe) => {
    if (toggleFavoriteWithCleanup(recipe) !== null) {
      refresh();
      refreshPhotos();
    }
  };

  return (
    <div className="space-y-5 px-5 pb-4 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-heading">Gallery</h1>
          {favorites.length > 0 && (
            <p className="mt-0.5 text-sm text-ink-soft">{favorites.length} resep tersimpan</p>
          )}
        </div>
        {favorites.length > 1 && (
          <button
            type="button"
            onClick={() => setSort((s) => (s === 'newest' ? 'az' : 'newest'))}
            className="clay-sm clay-press flex h-11 items-center gap-2 rounded-full bg-surface px-4 text-sm font-bold text-heading"
            aria-label={`Urutkan: ${sort === 'newest' ? 'Terbaru' : 'A sampai Z'}. Ketuk untuk mengganti.`}
          >
            <SortIcon className="h-5 w-5" />
            {sort === 'newest' ? 'Terbaru' : 'A–Z'}
          </button>
        )}
      </header>

      {ready && favorites.length === 0 ? (
        <div className="space-y-4 px-6 py-16 text-center">
          <ChefHeartIllustration className="mx-auto h-36 w-36" />
          <p className="font-display text-lg font-semibold text-heading">
            Belum ada resep favorit
          </p>
          <p className="text-sm text-ink-soft">
            Tambahkan resep ke daftar favorit untuk melihatnya di sini.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {sorted.map((recipe) => {
            const photo = photos[recipe.id]?.photo;
            return (
              <li key={recipe.id} className="clay-sm relative p-2">
                <Link
                  href={`/recipe/${encodeURIComponent(recipe.id)}`}
                  className="block rounded-2xl"
                >
                  <span className="clay-well clay-xs grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[1.25rem]">
                    {photo ? (
                      <img
                        src={photo}
                        alt={`Foto masakan ${recipe.title}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PanIllustration className="h-16 w-16" />
                    )}
                  </span>
                  <span className="mt-3 line-clamp-2 block px-1 font-display text-base font-semibold leading-snug text-heading">
                    {recipe.title}
                  </span>
                  <span className="block px-1 pb-1 pt-0.5 text-xs font-semibold text-ink-soft">
                    {recipe.time} · {recipe.difficulty}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleUnstar(recipe)}
                  aria-pressed
                  aria-label={`Hapus ${recipe.title} dari favorit`}
                  className="clay-sm clay-xs clay-press absolute right-3.5 top-3.5 grid h-11 w-11 place-items-center rounded-full bg-surface"
                >
                  <HeartIcon filled className="h-5 w-5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
