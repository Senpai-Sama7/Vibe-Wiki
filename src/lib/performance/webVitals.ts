import type { Metric } from 'web-vitals';
import { onCLS, onFID, onINP, onLCP, onTTFB } from 'web-vitals';

type WebVitalName = Metric['name'];

type Subscriber = (metric: Metric) => void;

const subscribers = new Set<Subscriber>();
let isListening = false;

function notify(metric: Metric) {
  subscribers.forEach((subscriber) => {
    try {
      subscriber(metric);
    } catch (error) {
      console.error('[performance] web vitals subscriber error', error);
    }
  });
}

function beginListening() {
  if (isListening) return;
  isListening = true;

  onCLS(notify);
  onFID(notify);
  onINP(notify);
  onLCP(notify);
  onTTFB(notify);
}

export function subscribeToWebVitals(callback: Subscriber) {
  subscribers.add(callback);
  beginListening();
  return () => {
    subscribers.delete(callback);
  };
}

export interface WebVitalsState {
  metrics: Partial<Record<WebVitalName, Metric>>;
}

export function summarizeMetric(metric: Metric): string {
  const value = metric.name === 'CLS' ? metric.value.toFixed(3) : metric.value.toFixed(0);
  return `${metric.name}: ${value}`;
}
