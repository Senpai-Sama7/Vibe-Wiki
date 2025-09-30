'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getAllProgress,
  getVisitedSections,
  logProgress,
  trackSectionVisit,
  type ProgressEntry,
  type VisitedSection,
} from '@/lib/storage/progressStore';

const PROGRESS_EVENT = 'vibe-wiki-progress-update';

interface UseProgressOptions {
  sections?: string[];
}

export interface ProgressState {
  progress: ProgressEntry[];
  visited: VisitedSection[];
  completionRate: number;
}

export function useProgress({ sections = [] }: UseProgressOptions = {}): ProgressState {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [visited, setVisited] = useState<VisitedSection[]>([]);

  const reload = useCallback(async () => {
    const [allProgress, allVisited] = await Promise.all([
      getAllProgress(),
      getVisitedSections()
    ]);
    setProgress(allProgress);
    setVisited(allVisited);
  }, []);

  useEffect(() => {
    reload();

    const handleExternalUpdate = () => {
      reload();
    };

    window.addEventListener(PROGRESS_EVENT, handleExternalUpdate as EventListener);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, handleExternalUpdate as EventListener);
    };
  }, [reload]);

  const completionRate = sections.length
    ? Math.min(100, Math.round((visited.length / sections.length) * 100))
    : visited.length;

  return { progress, visited, completionRate };
}

export async function recordProgress(entry: Omit<ProgressEntry, 'timestamp'>) {
  await logProgress({ ...entry, timestamp: Date.now() });
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
}

export async function recordSectionVisit(section: string) {
  await trackSectionVisit(section);
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
}
