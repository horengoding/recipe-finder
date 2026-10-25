'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/favorites';
import { usePickedPhoto } from '@/lib/hooks';
import {
  AnalysisResult,
  MAX_ANALYSIS,
  clearPendingImage,
  getAnalysisCount,
  getPendingImage,
  incrementAnalysisCount,
  saveResult,
  setPendingImage,
} from '@/lib/storage';
import { AlertIcon, CameraIcon, CloseIcon, ImageIcon, SpinnerIcon } from '@/components/icons';
import { FridgeIllustration } from '@/components/illustrations';

function SourceCard({
  title,
  desc,
  capture,
  Icon,
  onChange,
}: {
  title: string;
  desc: string;
  capture?: boolean;
  Icon: (p: { className?: string }) => React.JSX.Element;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="clay clay-field clay-press flex cursor-pointer flex-col items-center gap-3 px-6 py-8 text-center">
      <input
        type="file"
        accept="image/*"
        capture={capture ? 'environment' : undefined}
        onChange={onChange}
        className="sr-only"
      />
      <span className="clay-peach clay-xs grid h-16 w-16 place-items-center rounded-full">
        <Icon className="h-8 w-8" />
      </span>
      <span className="font-display text-xl font-semibold text-heading">{title}</span>
      <span className="text-sm text-ink-soft">{desc}</span>
    </label>
  );
}

export default function PickPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImage(getPendingImage());
    setCount(getAnalysisCount());
  }, []);

  const picker = usePickedPhoto((dataUrl) => {
    setPendingImage(dataUrl);
    setImage(dataUrl);
    setError(null);
  });

  const exhausted = count >= MAX_ANALYSIS;

  const analyze = async () => {
    if (!image) return;

    const current = getAnalysisCount();
    if (current >= MAX_ANALYSIS) {
      setCount(current);
      setError('Kamu sudah mencapai batas penggunaan harian. Silakan kembali lagi besok!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal menganalisis gambar');
      }

      // Pastikan id resep unik antar analisis. Kalau API memakai id urutan ("1".."5"),
      // favorit baru akan dikira duplikat dan tidak tersimpan.
      const tag = Date.now().toString(36);
      const result: AnalysisResult = {
        detectedIngredients: data.result?.detectedIngredients ?? [],
        recipes: (data.result?.recipes ?? []).map((r: Recipe, i: number) => ({
          ...r,
          id: `${tag}-${i}-${r.id ?? i}`,
        })),
      };

      saveResult(result);

      // Kuota HANYA berkurang di sini, setelah analisis berhasil.
      // Kalau fetch gagal atau API error, kode sudah lompat ke catch dan kesempatan tetap utuh.
      setCount(incrementAnalysisCount());
      clearPendingImage();
      router.push('/list');
    } catch (err: any) {
      setError(
        err?.message ||
          'Terjadi kesalahan saat memproses gambar. Kesempatan analisismu belum berkurang, silakan coba lagi.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-5 pb-10 pt-6">
      <header className="relative flex min-h-11 items-center justify-center">
        <Link
          href="/"
          aria-label="Tutup"
          className="clay-sm clay-press absolute left-0 grid h-11 w-11 place-items-center rounded-full bg-surface text-heading"
        >
          <CloseIcon className="h-5 w-5" />
        </Link>
        <h1 className="font-display text-lg font-semibold text-heading">Pilih Sumber Foto</h1>
      </header>

      {error && (
        <div
          role="alert"
          className="clay-sm flex items-center gap-2.5 bg-danger p-4 text-sm font-semibold text-danger-ink"
        >
          <AlertIcon className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}
      {picker.error && (
        <div
          role="alert"
          className="clay-sm flex items-center gap-2.5 bg-danger p-4 text-sm font-semibold text-danger-ink"
        >
          <AlertIcon className="h-5 w-5 shrink-0" />
          {picker.error}
        </div>
      )}

      {image ? (
        <section className="space-y-5">
          <div className="clay-sm rounded-[1.75rem] p-2">
            <img
              src={image}
              alt="Foto bahan yang akan dianalisis"
              className="h-60 w-full rounded-[1.35rem] object-cover md:h-80"
            />
          </div>

          <button
            onClick={analyze}
            disabled={loading || exhausted}
            className="clay-peach clay-press flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full px-4 py-4 font-display text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {exhausted ? (
              'Kuota harian habis, besok lagi ya..'
            ) : loading ? (
              <>
                <SpinnerIcon className="h-5 w-5 animate-spin" /> Memproses Bahan...
              </>
            ) : (
              'Analisis & Cari Resep'
            )}
          </button>

          <p className="clay-chip mx-auto flex w-fit items-center gap-1.5 bg-royal-soft px-4 py-1.5 text-xs font-bold text-royal-soft-ink">
            Sisa Kuota Hari Ini:
            <span className="text-peach-deep">
              {Math.max(0, MAX_ANALYSIS - count)} / {MAX_ANALYSIS}
            </span>
          </p>

          <div className="space-y-3 pt-2">
            <p className="text-center text-sm font-semibold text-ink-soft">Ganti foto</p>
            <div className="flex gap-3">
              <label className="clay-field clay-sm clay-press flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-surface text-sm font-bold text-heading">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={picker.onChange}
                  className="sr-only"
                />
                <CameraIcon className="h-5 w-5" /> Kamera
              </label>
              <label className="clay-field clay-sm clay-press flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-surface text-sm font-bold text-heading">
                <input
                  type="file"
                  accept="image/*"
                  onChange={picker.onChange}
                  className="sr-only"
                />
                <ImageIcon className="h-5 w-5" /> Galeri
              </label>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
            <SourceCard
              title="Kamera"
              desc="Ambil foto bahan dan bumbu secara langsung."
              capture
              Icon={CameraIcon}
              onChange={picker.onChange}
            />
            <SourceCard
              title="Galeri"
              desc="Pilih foto dari galeri perangkatmu."
              Icon={ImageIcon}
              onChange={picker.onChange}
            />
          </div>

          {picker.busy && (
            <p role="status" className="flex items-center justify-center gap-2 text-sm font-semibold text-heading">
              <SpinnerIcon className="h-4 w-4 animate-spin" /> Menyiapkan foto...
            </p>
          )}

          <div className="mt-auto space-y-3 pt-4 text-center">
            <FridgeIllustration className="mx-auto h-24 w-20" />
            <p className="text-sm text-ink-soft">
              Gunakan foto bahan dan bumbu untuk menemukan resep terbaik!
            </p>
          </div>
        </>
      )}
    </div>
  );
}
