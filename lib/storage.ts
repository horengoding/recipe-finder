import {
  Recipe,
  getStarredRecipes,
  isRecipeStarred,
  removeFavoriteRecipe,
  toggleFavoriteRecipe,
} from './favorites';

export interface AnalysisResult {
  detectedIngredients: string[];
  recipes: Recipe[];
}

export const MAX_ANALYSIS = 2; // kuota analisis per hari
export const MAX_HOME_PINS = 5; // jumlah resep andalan yang boleh dipajang di Home (foto sendiri tanpa batas)

const KEYS = {
  count: 'kulkasai_analysis_count',
  date: 'kulkasai_analysis_date',
  photos: 'kulkasai_photos',
  result: 'kulkasai_last_result',
  pending: 'kulkasai_pending_image',
};

const isBrowser = () => typeof window !== 'undefined';

/* ---------- Kuota analisis harian ---------- */

// Tanggal lokal perangkat (YYYY-MM-DD), supaya reset terjadi tengah malam waktu pengguna, bukan UTC
function todayKey(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function getAnalysisCount(): number {
  if (!isBrowser()) return 0;
  try {
    const today = todayKey();
    if (localStorage.getItem(KEYS.date) !== today) {
      localStorage.setItem(KEYS.date, today);
      localStorage.setItem(KEYS.count, '0');
      return 0;
    }
    const n = parseInt(localStorage.getItem(KEYS.count) || '0', 10);
    return Number.isNaN(n) ? 0 : n;
  } catch {
    return 0;
  }
}

export function incrementAnalysisCount(): number {
  const next = getAnalysisCount() + 1;
  try {
    localStorage.setItem(KEYS.date, todayKey());
    localStorage.setItem(KEYS.count, String(next));
  } catch {
    /* abaikan: penyimpanan penuh atau diblokir */
  }
  return next;
}

/* ---------- Data sementara (hilang saat tab ditutup) ---------- */

export function saveResult(result: AnalysisResult) {
  try {
    sessionStorage.setItem(KEYS.result, JSON.stringify(result));
  } catch {
    /* abaikan */
  }
}

export function loadResult(): AnalysisResult | null {
  if (!isBrowser()) return null;
  try {
    const raw = sessionStorage.getItem(KEYS.result);
    return raw ? (JSON.parse(raw) as AnalysisResult) : null;
  } catch {
    return null;
  }
}

export function clearResult() {
  try {
    sessionStorage.removeItem(KEYS.result);
  } catch {
    /* abaikan */
  }
}

export function setPendingImage(dataUrl: string): boolean {
  try {
    sessionStorage.setItem(KEYS.pending, dataUrl);
    return true;
  } catch {
    return false;
  }
}

export function getPendingImage(): string | null {
  if (!isBrowser()) return null;
  try {
    return sessionStorage.getItem(KEYS.pending);
  } catch {
    return null;
  }
}

export function clearPendingImage() {
  try {
    sessionStorage.removeItem(KEYS.pending);
  } catch {
    /* abaikan */
  }
}

/* ---------- Foto hasil masakan (localStorage) ---------- */

export interface RecipePhoto {
  photo: string; // data URL JPEG hasil kompresi
  showOnHome: boolean;
}
type PhotoMap = Record<string, RecipePhoto>;

export function getPhotos(): PhotoMap {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(KEYS.photos);
    return raw ? (JSON.parse(raw) as PhotoMap) : {};
  } catch {
    return {};
  }
}

function writePhotos(map: PhotoMap): boolean {
  try {
    localStorage.setItem(KEYS.photos, JSON.stringify(map));
    return true;
  } catch {
    return false; // biasanya QuotaExceededError
  }
}

export function getPinnedCount(map: PhotoMap = getPhotos()): number {
  return Object.values(map).filter((p) => p.showOnHome).length;
}

export function savePhoto(id: string, dataUrl: string): 'ok' | 'storage' {
  const map = getPhotos();
  const prev = map[id];
  const showOnHome = prev ? prev.showOnHome : getPinnedCount(map) < MAX_HOME_PINS;
  map[id] = { photo: dataUrl, showOnHome };
  return writePhotos(map) ? 'ok' : 'storage';
}

export function setShowOnHome(id: string, show: boolean): 'ok' | 'limit' | 'nophoto' {
  const map = getPhotos();
  const entry = map[id];
  if (!entry) return 'nophoto';
  if (show && !entry.showOnHome && getPinnedCount(map) >= MAX_HOME_PINS) return 'limit';
  map[id] = { ...entry, showOnHome: show };
  writePhotos(map);
  return 'ok';
}

export function removePhoto(id: string) {
  const map = getPhotos();
  if (!(id in map)) return;
  delete map[id];
  writePhotos(map);
}

/* ---------- Favorit + pembersihan foto ---------- */

// Mengembalikan status favorit yang baru, atau null kalau pengguna membatalkan.
export function toggleFavoriteWithCleanup(recipe: Recipe): boolean | null {
  if (isRecipeStarred(recipe.id) && getPhotos()[recipe.id]) {
    const ok = window.confirm('Foto masakan untuk resep ini juga akan dihapus. Lanjutkan?');
    if (!ok) return null;
    removePhoto(recipe.id);
  }
  return toggleFavoriteRecipe(recipe);
}

// Hapus favorit, foto, dan data sementara. Kuota harian sengaja tidak ikut direset.
export function clearAllLocalData() {
  getStarredRecipes().forEach((r) => removeFavoriteRecipe(r.id));
  try {
    localStorage.removeItem(KEYS.photos);
  } catch {
    /* abaikan */
  }
  clearResult();
  clearPendingImage();
}
