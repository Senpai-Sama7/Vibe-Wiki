import { withStore, readFromLocalStorage, writeToLocalStorage } from './indexedDB';

const PROGRESS_STORE = 'progress' as const;
const VISITED_STORE = 'visited' as const;

export interface ProgressEntry {
  id?: number;
  action: string;
  conceptId?: string;
  section?: string;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

export interface VisitedSection {
  section: string;
  visitCount: number;
  lastVisit: number;
}

export async function logProgress(entry: ProgressEntry): Promise<void> {
  const payload: ProgressEntry = {
    ...entry,
    timestamp: entry.timestamp ?? Date.now(),
  };

  const result = await withStore(PROGRESS_STORE, 'readwrite', async (store) => {
    store.add(payload);
  });

  if (result === null) {
    const existing = readFromLocalStorage<ProgressEntry>('progress');
    existing.push(payload);
    writeToLocalStorage('progress', existing);
  }
}

export async function getAllProgress(): Promise<ProgressEntry[]> {
  const result = await withStore(PROGRESS_STORE, 'readonly', async (store) => {
    return new Promise<ProgressEntry[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result as ProgressEntry[]);
      request.onerror = () => reject(request.error);
    });
  });

  if (result === null) {
    return readFromLocalStorage<ProgressEntry>('progress');
  }

  return result ?? [];
}

export async function trackSectionVisit(section: string): Promise<void> {
  const now = Date.now();

  const result = await withStore(VISITED_STORE, 'readwrite', async (store) => {
    const existingRequest = store.get(section);
    const existing = await new Promise<VisitedSection | undefined>((resolve, reject) => {
      existingRequest.onsuccess = () => resolve(existingRequest.result as VisitedSection | undefined);
      existingRequest.onerror = () => reject(existingRequest.error);
    });

    const payload: VisitedSection = {
      section,
      visitCount: existing ? existing.visitCount + 1 : 1,
      lastVisit: now,
    };

    store.put(payload);
  });

  if (result === null) {
    const existing = readFromLocalStorage<VisitedSection>('visited');
    const idx = existing.findIndex((item) => item.section === section);
    if (idx >= 0) {
      existing[idx] = {
        ...existing[idx],
        visitCount: existing[idx].visitCount + 1,
        lastVisit: now,
      };
    } else {
      existing.push({ section, visitCount: 1, lastVisit: now });
    }
    writeToLocalStorage('visited', existing);
  }
}

export async function getVisitedSections(): Promise<VisitedSection[]> {
  const result = await withStore(VISITED_STORE, 'readonly', async (store) => {
    return new Promise<VisitedSection[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result as VisitedSection[]);
      request.onerror = () => reject(request.error);
    });
  });

  if (result === null) {
    return readFromLocalStorage<VisitedSection>('visited');
  }

  return result ?? [];
}

export async function clearProgress(): Promise<void> {
  await withStore(PROGRESS_STORE, 'readwrite', async (store) => {
    store.clear();
  });
  await withStore(VISITED_STORE, 'readwrite', async (store) => {
    store.clear();
  });
  writeToLocalStorage('progress', []);
  writeToLocalStorage('visited', []);
}
