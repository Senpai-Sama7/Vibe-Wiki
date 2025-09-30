'use client';

import { useEffect, useState } from 'react';
import type { Metric } from 'web-vitals';
import { subscribeToWebVitals, type WebVitalsState } from '@/lib/performance/webVitals';

export function useWebVitals(): WebVitalsState {
  const [metrics, setMetrics] = useState<WebVitalsState['metrics']>({});

  useEffect(() => {
    const unsubscribe = subscribeToWebVitals((metric: Metric) => {
      setMetrics((current) => ({
        ...current,
        [metric.name]: metric,
      }));
    });

    return () => unsubscribe();
  }, []);

  return { metrics };
}
