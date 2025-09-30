/**
 * Lightweight IndexedDB helper with graceful degradation.
 */

const DB_NAME = 'VibeWikiProgress';
const DB_VERSION = 1;
const PROGRESS_STORE = 'progress';
const VISITED_STORE = 'visited';

// LocalStorage fallback keys
const LS_PROGRESS_KEY = 'vibeWiki.progress';
const LS_VISITED_KEY = 'vibeWiki.visited';

type DBInstance = IDBDatabase | null;
let dbInstance: DBInstance = null;

function isIndexedDBAvailable(): boolean {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

export async function getDatabase(): Promise<IDBDatabase | null> {
  if (!isIndexedDBAvailable()) {
    return null;
  }

  if (dbInstance) {
    return dbInstance;
  }

  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('[progress] IndexedDB open failed', request.error);
      resolve(null);
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
        db.createObjectStore(PROGRESS_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(VISITED_STORE)) {
        db.createObjectStore(VISITED_STORE, { keyPath: 'section' });
      }
    };
  });
}

export async function withStore<T>(
  storeName: typeof PROGRESS_STORE | typeof VISITED_STORE,
  mode: IDBTransactionMode,
  handler: (store: IDBObjectStore) => Promise<T> | T
): Promise<T | null> {
  const db = await getDatabase();
  if (!db) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);

    Promise.resolve(handler(store))
      .then(resolve)
      .catch(reject);

    transaction.onerror = () => {
      console.error('[progress] transaction error', transaction.error);
    };
  });
}

// LocalStorage helpers -----------------------------------------------------
function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readFromLocalStorage<T>(key: 'progress' | 'visited'): T[] {
  const ls = getLocalStorage();
  if (!ls) return [];
  try {
    const raw = ls.getItem(key === 'progress' ? LS_PROGRESS_KEY : LS_VISITED_KEY);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch (error) {
    console.warn('[progress] failed to parse localStorage fallback', error);
    return [];
  }
}

export function writeToLocalStorage<T>(key: 'progress' | 'visited', value: T[]): void {
  const ls = getLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key === 'progress' ? LS_PROGRESS_KEY : LS_VISITED_KEY, JSON.stringify(value));
  } catch (error) {
    console.warn('[progress] failed to write localStorage fallback', error);
  }
}

export function clearLocalStorageFallback(): void {
  const ls = getLocalStorage();
  if (!ls) return;
  ls.removeItem(LS_PROGRESS_KEY);
  ls.removeItem(LS_VISITED_KEY);
}
