'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/favorites';
import { useFavorites } from '@/lib/hooks';
import { AnalysisResult, clearResult, loadResult, toggleFavoriteWithCleanup } from '@/lib/storage';
import { HeartIcon, InfoIcon, TrashIcon } from '@/components/icons';
import { PanIllustration } from '@/components/illustrations';

export default function ListPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { favorites, refresh } = useFavorites();

  useEffect(() => {
    setResult(loadResult());
    setLoaded(true);
  }, []);

  const recipes: Recipe[] = result?.recipes ?? [];

  const handleClear = () => {
    if (!window.confirm('Hapus semua hasil pencarian sementara ini?')) return;
    clearResult();
    setResult(null);
  };

  const handleToggle = (recipe: Recipe) => {
    if (toggleFavoriteWithCleanup(recipe) !== null) refresh();
  };

  return (
    <div className="space-y-5 px-5 pb-4 pt-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-heading">List</h1>
        <button
          type="button"
          onClick={handleClear}
          disabled={recipes.length === 0}
          aria-label="Hapus semua hasil pencarian"
          className="clay-sm clay-press grid h-11 w-11 place-items-center rounded-full bg-surface text-heading disabled:opacity-40"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </header>

      {loaded && recipes.length === 0 ? (
        <div className="clay-well space-y-4 px-6 py-12 text-center">
          <PanIllustration className="mx-auto h-24 w-24" />
          <p className="font-display text-lg font-semibold text-heading">
            Belum ada hasil pencarian
          </p>
          <p className="text-sm text-ink-soft">
            Analisis foto bahan masakan dulu, nanti daftar resep dari AI muncul di sini.
          </p>
          <Link
            href="/pick"
            className="clay-peach clay-press mx-auto flex h-12 w-fit items-center rounded-full px-6 font-display text-base font-semibold"
          >
            Cari Resep dari Foto
          </Link>
        </div>
      ) : (
        <>
          <div className="clay-well flex items-start gap-3 p-4 text-sm text-ink">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-royal dark:text-peach" />
            <p>
              Resep ini hanya sementara. Simpan dengan menekan{' '}
              <HeartIcon filled className="inline h-4 w-4 align-text-bottom" />.
            </p>
          </div>

          {result && result.detectedIngredients.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="font-display text-base font-semibold text-heading">
                Bahan yang Terdeteksi
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.detectedIngredients.map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="clay-chip bg-royal-soft px-3.5 py-1.5 text-sm font-semibold text-royal-soft-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          )}

          <ul className="space-y-3.5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {recipes.map((recipe) => {
              const starred = favorites.some((f) => f.id === recipe.id);
              const firstStep = recipe.steps?.[0];
              return (
                <li key={recipe.id} className="clay-sm flex items-center gap-2 p-3">
                  <Link
                    href={`/recipe/${encodeURIComponent(recipe.id)}`}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl"
                  >
                    <span className="clay-well clay-xs grid h-16 w-16 shrink-0 place-items-center rounded-2xl">
                      <PanIllustration className="h-12 w-12" />
                    </span>
                    <span className="min-w-0">
                      <span className="line-clamp-2 block font-display text-base font-semibold leading-snug text-heading">
                        {recipe.title}
                      </span>
                      <span className="block text-xs font-semibold text-ink-soft">
                        {recipe.time} · {recipe.difficulty}
                      </span>
                      {firstStep && (
                        <span className="mt-0.5 line-clamp-1 block text-sm text-ink-soft">
                          {firstStep}
                        </span>
                      )}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleToggle(recipe)}
                    aria-pressed={starred}
                    aria-label={starred ? 'Hapus dari Gallery' : 'Simpan ke Gallery'}
                    className="clay-sm clay-xs clay-press grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface text-ink-soft"
                  >
                    <HeartIcon filled={starred} className="h-5 w-5" />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="clay-well flex items-start gap-3 p-4 text-sm text-ink">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-royal dark:text-peach" />
            <p>Jangan lupa simpan resep ini ke Gallery agar tidak hilang saat halaman ditutup.</p>
          </div>
        </>
      )}
    </div>
  );
}
