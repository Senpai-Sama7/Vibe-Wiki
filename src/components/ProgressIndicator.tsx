'use client';

import { useMemo } from 'react';
import { useProgress } from '@/hooks/useProgress';

interface ProgressIndicatorProps {
  sections?: string[];
  className?: string;
}

export function ProgressIndicator({ sections = [], className = '' }: ProgressIndicatorProps) {
  const { completionRate, visited } = useProgress({ sections });

  const caption = useMemo(() => {
    if (sections.length === 0) {
      return `${visited.length} sections visited`;
    }
    return `${visited.length}/${sections.length} sections explored`;
  }, [sections.length, visited.length]);

  return (
    <div className={`flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800 ${className}`}>
      <div className="relative h-10 w-10">
        <svg className="h-full w-full" viewBox="0 0 36 36">
          <path
            className="text-blue-200"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-blue-500"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${completionRate}, 100`}
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {completionRate}%
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide">Progress</p>
        <p className="text-[13px] text-blue-700">{caption}</p>
      </div>
    </div>
  );
}
