'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Recipe, getStarredRecipes } from './favorites';
import { getPhotos } from './storage';
import type { RecipePhoto } from './storage';
import { fileToCompressedDataUrl } from './image';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => setFavorites(getStarredRecipes()), []);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  return { favorites, refresh, ready };
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Record<string, RecipePhoto>>({});

  const refresh = useCallback(() => setPhotos(getPhotos()), []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { photos, refresh };
}

// Menangani <input type="file">: kompres foto lalu serahkan data URL-nya ke onDone.
export function usePickedPhoto(onDone: (dataUrl: string) => void) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // supaya memilih file yang sama dua kali tetap memicu onChange
    if (!file) return;

    setBusy(true);
    setError(null);
    try {
      const dataUrl = await fileToCompressedDataUrl(file, 1280, 0.8);
      onDone(dataUrl);
    } catch (err: any) {
      setError(err?.message || 'Gagal memproses foto.');
    } finally {
      setBusy(false);
    }
  };

  return { busy, error, onChange };
}
