'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Recipe, getStarredRecipes } from '@/lib/favorites';
import { useFavorites, usePhotos } from '@/lib/hooks';
import { fileToCompressedDataUrl } from '@/lib/image';
import {
  MAX_HOME_PINS,
  getPinnedCount,
  loadResult,
  removePhoto,
  savePhoto,
  setShowOnHome,
  toggleFavoriteWithCleanup,
} from '@/lib/storage';
import {
  AlertIcon,
  ArrowLeftIcon,
  CameraIcon,
  CartIcon,
  CheckIcon,
  ChefHatIcon,
  ClockIcon,
  CloseIcon,
  DotsIcon,
  HeartIcon,
  PlayIcon,
  SpinnerIcon,
  TrashIcon,
} from '@/components/icons';
import { PanIllustration } from '@/components/illustrations';
import Switch from '@/components/Switch';

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = safeDecode(params.id);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { favorites, refresh } = useFavorites();
  const { photos, refresh: refreshPhotos } = usePhotos();

  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Cari di Gallery dulu, kalau tidak ada baru di hasil pencarian sementara
    const found =
      getStarredRecipes().find((r) => r.id === id) ??
      loadResult()?.recipes.find((r) => r.id === id) ??
      null;
    setRecipe(found);
    setLoaded(true);
  }, [id]);

  // Tutup sheet/mode memasak dengan tombol Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOptionsOpen(false);
      setCooking(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!loaded) {
    return (
      <div className="grid min-h-dvh place-items-center text-heading">
        <SpinnerIcon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-8 text-center">
        <PanIllustration className="h-24 w-24" />
        <p className="font-display text-xl font-semibold text-heading">Resep tidak ditemukan</p>
        <p className="text-sm text-ink-soft">
          Resep sementara hilang saat halaman ditutup. Simpan dengan ikon hati supaya tetap ada.
        </p>
        <Link
          href="/list"
          className="clay-blue on-blue clay-press flex h-12 items-center rounded-full px-6 font-display font-semibold text-white"
        >
          Kembali ke List
        </Link>
      </div>
    );
  }

  const steps = recipe.steps ?? [];
  const missing = recipe.missingIngredients ?? [];
  const starred = favorites.some((f) => f.id === recipe.id);
  const photoEntry = photos[recipe.id];
  const pinnedCount = getPinnedCount(photos);
  const pinFull = !photoEntry?.showOnHome && pinnedCount >= MAX_HOME_PINS;

  const handleToggleFavorite = () => {
    if (toggleFavoriteWithCleanup(recipe) !== null) {
      refresh();
      refreshPhotos();
      setNotice(null);
    }
  };

  const handlePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setBusy(true);
    setNotice(null);
    try {
      const dataUrl = await fileToCompressedDataUrl(file, 800, 0.75);
      const status = savePhoto(recipe.id, dataUrl);
      if (status === 'storage') {
        setNotice(
          `Penyimpanan browser penuh, foto tidak bisa disimpan. Hapus foto di resep lain untuk menghemat ruang.`
        );
      } else {
        setNotice('Foto tersimpan.');
        refreshPhotos();
      }
    } catch (err: any) {
      setNotice(err?.message || 'Gagal memproses foto.');
    } finally {
      setBusy(false);
    }
  };

  const handleRemovePhoto = () => {
    removePhoto(recipe.id);
    refreshPhotos();
    setNotice('Foto dihapus.');
  };

  const handleShowOnHome = (next: boolean) => {
    const status = setShowOnHome(recipe.id, next);
    if (status === 'limit') {
      setNotice(
        `Resep andalan di Home maksimal ${MAX_HOME_PINS}. Matikan salah satu dulu di resep lain.`,
      );
    } else {
      setNotice(null);
    }
    refreshPhotos();
  };

  const startCooking = () => {
    setStepIdx(0);
    setCooking(true);
  };

  const nextStep = () => {
    setChecked((prev) => ({ ...prev, [stepIdx]: true }));
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };

  const finishCooking = () => {
    setChecked((prev) => ({ ...prev, [stepIdx]: true }));
    setCooking(false);
  };

  return (
    <div className="pb-32">
      <div className="mx-auto max-w-3xl space-y-5 px-5 pt-6">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Kembali"
            className="clay-sm clay-press grid h-11 w-11 place-items-center rounded-full bg-surface text-heading"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-pressed={starred}
            aria-label={starred ? 'Hapus dari Gallery' : 'Simpan ke Gallery'}
            className="clay-sm clay-press grid h-11 w-11 place-items-center rounded-full bg-surface text-ink-soft"
          >
            <HeartIcon filled={starred} className="h-5 w-5" />
          </button>
        </header>

        <div className="clay-sm rounded-[1.75rem] p-2">
          <div className="clay-well clay-xs grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-[1.35rem]">
            {photoEntry ? (
              <img
                src={photoEntry.photo}
                alt={`Foto masakan ${recipe.title}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <PanIllustration className="h-28 w-28" />
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-2xl font-semibold leading-snug text-heading">
            {recipe.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="clay-chip flex items-center gap-1.5 whitespace-nowrap bg-royal-soft px-3 py-1 text-xs font-bold text-royal-soft-ink">
              <ClockIcon className="h-4 w-4" />
              {recipe.time}
            </span>
            <span className="clay-chip bg-peach-soft px-3 py-1 text-xs font-bold text-peach-soft-ink">
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {missing.length > 0 && (
          <div className="clay-well space-y-2 p-4 text-sm text-ink">
            <span className="flex items-center gap-2 font-bold text-heading">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-peach-soft text-peach-soft-ink">
                <CartIcon className="h-4 w-4" />
              </span>
              Perlu Ditambah
            </span>
            <p className="text-ink-soft">{missing.join(', ')}</p>
          </div>
        )}

        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-base font-bold text-heading">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-royal-soft text-royal-soft-ink">
              <ChefHatIcon className="h-5 w-5" />
            </span>
            Langkah Memasak
          </h2>
          <ul className="space-y-2 text-base">
            {steps.map((step, i) => {
              const isChecked = !!checked[i];
              return (
                <li key={i}>
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3 transition-colors ${
                      isChecked
                        ? 'clay-well clay-xs text-ink-soft line-through'
                        : 'text-ink hover:bg-royal-soft'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
                      className="peer sr-only"
                    />
                    <span
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus ${
                        isChecked ? 'clay-blue clay-xs' : 'clay-well clay-xs bg-surface'
                      }`}
                    >
                      {isChecked && <CheckIcon className="h-4 w-4 text-white" />}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Bar aksi bawah */}
      <div className="on-blue safe-bottom fixed inset-x-0 bottom-0 z-20 bg-cream/90 px-4 pt-3 backdrop-blur md:left-64">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
        <button
          type="button"
          onClick={() => setOptionsOpen(true)}
          aria-label="Buka opsi"
          className="clay-sm clay-press grid h-14 w-14 shrink-0 place-items-center rounded-full bg-surface text-heading"
        >
          <DotsIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={startCooking}
          disabled={steps.length === 0}
          className="clay-blue clay-press flex h-14 flex-1 items-center justify-center gap-2 rounded-full font-display text-lg font-semibold text-white disabled:opacity-50"
        >
          <PlayIcon className="h-5 w-5" />
          Mulai Memasak
        </button>
        </div>
      </div>

      {/* Sheet Opsi */}
      {optionsOpen && (
        <div className="fixed inset-0 z-30 mx-auto max-w-[430px]">
          <button
            type="button"
            aria-label="Tutup opsi"
            onClick={() => setOptionsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Opsi resep"
            className="clay safe-bottom absolute inset-x-0 bottom-0 mx-auto w-full max-w-lg space-y-4 rounded-b-none rounded-t-[2rem] px-5 pb-4 pt-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-[2rem]"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-heading">Opsi</h2>
              <button
                type="button"
                autoFocus
                onClick={() => setOptionsOpen(false)}
                aria-label="Tutup"
                className="clay-sm clay-xs clay-press grid h-11 w-11 place-items-center rounded-full bg-surface text-heading"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {!starred && (
              <p className="clay-well flex items-start gap-2.5 p-3.5 text-sm text-ink">
                <HeartIcon filled className="mt-0.5 h-4 w-4 shrink-0" />
                Simpan resep ke Gallery dengan ikon hati dulu untuk memakai opsi ini.
              </p>
            )}

            <div
              className={`clay-sm flex items-center gap-3 p-4 ${
                starred && photoEntry ? '' : 'opacity-60'
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-semibold text-heading">
                  Tampilkan di Home
                </p>
                <p className="text-sm text-ink-soft">
                  {photoEntry
                    ? 'Tambahkan foto dulu agar bisa tampil di Home'
                    : pinFull
                      ? `Slot resep andalan penuh (${pinnedCount} / ${MAX_HOME_PINS}). Matikan salah satu dulu.`
                      : `Resep andalan di Home: ${pinnedCount} / ${MAX_HOME_PINS}`}

                </p>
              </div>
              <Switch
                checked={!!photoEntry?.showOnHome}
                onChange={handleShowOnHome}
                label="Tampilkan di Home"
                disabled={!starred || !photoEntry || pinFull}
              />
            </div>

            <label
              className={`clay-sm clay-field flex items-center gap-3 p-4 ${
                starred ? 'clay-press cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                disabled={!starred || busy}
                className="sr-only"
              />
              <span className="clay-peach clay-xs grid h-11 w-11 shrink-0 place-items-center rounded-full">
                {busy ? (
                  <SpinnerIcon className="h-5 w-5 animate-spin" />
                ) : (
                  <CameraIcon className="h-5 w-5" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-semibold text-heading">
                  {photoEntry ? 'Ganti Foto' : 'Tambah Foto'}
                </span>
                <span className="block text-sm text-ink-soft">
                  Foto hasil masakanmu
                </span>
              </span>
            </label>

            {photoEntry && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="clay-sm clay-press flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-danger px-4 font-bold text-danger-ink"
              >
                <TrashIcon className="h-5 w-5" />
                Hapus Foto
              </button>
            )}

            {notice && (
              <p role="status" className="flex items-start gap-2 text-sm font-semibold text-heading">
                <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {notice}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Mode memasak: satu langkah per layar */}
      {cooking && steps.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mode memasak"
          className="on-blue fixed inset-0 z-40 bg-cream"
        >
        <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-6 px-5 pb-6 pt-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              autoFocus
              onClick={() => setCooking(false)}
              aria-label="Tutup mode memasak"
              className="clay-sm clay-press grid h-11 w-11 place-items-center rounded-full bg-surface text-heading"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <p className="font-display text-base font-semibold text-heading">
              Langkah {stepIdx + 1} dari {steps.length}
            </p>
            <span className="w-11" aria-hidden="true" />
          </div>
        </div>

          <div
            className="clay-well clay-xs h-3 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={stepIdx + 1}
          >
            <div
              className="h-full rounded-full bg-royal transition-all"
              style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-1 items-center">
            <p className="font-display text-2xl leading-relaxed text-ink">{steps[stepIdx]}</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
              className="clay-sm clay-press flex h-14 flex-1 items-center justify-center rounded-full bg-surface font-display text-lg font-semibold text-heading disabled:opacity-40"
            >
              Sebelumnya
            </button>
            {stepIdx === steps.length - 1 ? (
              <button
                type="button"
                onClick={finishCooking}
                className="clay-peach clay-press flex h-14 flex-1 items-center justify-center rounded-full font-display text-lg font-semibold"
              >
                Selesai
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="clay-blue clay-press flex h-14 flex-1 items-center justify-center rounded-full font-display text-lg font-semibold text-white"
              >
                Lanjut
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
