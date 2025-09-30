'use client';

import { useWebVitals } from '@/hooks/useWebVitals';
import { summarizeMetric } from '@/lib/performance/webVitals';

interface WebVitalsDashboardProps {
  className?: string;
}

const VITALS_ORDER = ['LCP', 'FID', 'CLS', 'INP', 'TTFB'] as const;

export function WebVitalsDashboard({ className = '' }: WebVitalsDashboardProps) {
  const { metrics } = useWebVitals();

  return (
    <section className={`rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm ${className}`}>
      <header className="flex items-center justify-between text-sm font-semibold text-slate-600">
        <span>Live Web Vitals</span>
        <span className="uppercase tracking-wide text-slate-400">Performance budget</span>
      </header>
      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        {VITALS_ORDER.map((name) => {
          const metric = metrics[name];
          return (
            <div key={name} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{name}</dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900">
                {metric ? summarizeMetric(metric) : '—'}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-3 text-xs text-slate-500">
        Metrics update in real time from the Web Vitals API. Target budgets: LCP &lt; 2.5s, FID &lt; 100ms, CLS &lt; 0.1, INP &lt; 200ms, TTFB &lt; 800ms.
      </p>
    </section>
  );
}
