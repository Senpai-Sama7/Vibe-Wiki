'use client';

import { motion } from 'framer-motion';
import { useWebVitals } from '@/hooks/useWebVitals';
import { contentManifest } from '@/lib/content/concepts';
import { useEffect, useState } from 'react';
import type { Metric } from 'web-vitals';
import dynamic from 'next/dynamic';

const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-800/20" />
  ),
});

const HeroOrbitalScene = dynamic(() => import('./HeroOrbitalScene'), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-square w-full max-w-sm">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/15 to-purple-500/20 blur-3xl" />
      <div className="flex h-full items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
        Loading vibes…
      </div>
    </div>
  )
});

interface MetricDisplayProps {
  name: string;
  metric?: Metric;
  target: string;
  description: string;
}

function MetricDisplay({ name, metric, target, description }: MetricDisplayProps) {
  const getValue = () => {
    if (!metric) return '—';

    if (name === 'CLS') {
      return metric.value.toFixed(3);
    }

    if (name === 'LCP' || name === 'FID' || name === 'INP' || name === 'TTFB') {
      return `${Math.round(metric.value)}ms`;
    }

    return metric.value.toFixed(0);
  };

  const getStatus = (): 'good' | 'needs-improvement' | 'poor' | 'unknown' => {
    if (!metric) return 'unknown';

    const thresholds: Record<string, { good: number; poor: number }> = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      INP: { good: 200, poor: 500 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name];
    if (!threshold) return 'unknown';

    if (metric.value <= threshold.good) return 'good';
    if (metric.value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const status = getStatus();
  const statusColors = {
    good: 'bg-green-500/20 text-green-100 border-green-500/30',
    'needs-improvement': 'bg-yellow-500/20 text-yellow-100 border-yellow-500/30',
    poor: 'bg-red-500/20 text-red-100 border-red-500/30',
    unknown: 'bg-white/10 text-blue-100 border-white/20',
  };

  const statusIcons = {
    good: '✓',
    'needs-improvement': '⚠',
    poor: '✗',
    unknown: '○',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border backdrop-blur-sm px-4 py-3 ${statusColors[status]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide">{name}</span>
        <span className="text-sm font-bold" aria-label={`Status: ${status}`}>
          {statusIcons[status]}
        </span>
      </div>
      <div className="mt-1 text-2xl font-bold">{getValue()}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wide opacity-80">
        Target: {target}
      </div>
      <div className="mt-1 text-xs opacity-70">{description}</div>
    </motion.div>
  );
}

export interface HeroEnhancedProps {
  className?: string;
  showMetrics?: boolean;
  enableBackground?: boolean;
}

export function HeroEnhanced({
  className = '',
  showMetrics = true,
  enableBackground = true,
}: HeroEnhancedProps) {
  const { metrics } = useWebVitals();
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (Object.keys(metrics).length > 0) {
      setLastUpdated(new Date());
    }
  }, [metrics]);

  const stats = [
    {
      value: contentManifest.totalConcepts,
      label: 'Concepts',
      description: 'Ready to explore',
      icon: '📚',
    },
    {
      value: '3',
      label: 'Learning Modes',
      description: 'Plain, analogy, technical',
      icon: '🎯',
    },
    {
      value: '<30s',
      label: 'Concept Mastery',
      description: 'Per concept average',
      icon: '⚡',
    },
  ];

  const metricsData = [
    {
      name: 'LCP',
      metric: metrics.LCP,
      target: '<2.5s',
      description: 'Largest content paint',
    },
    {
      name: 'FID',
      metric: metrics.FID,
      target: '<100ms',
      description: 'First input delay',
    },
    {
      name: 'CLS',
      metric: metrics.CLS,
      target: '<0.1',
      description: 'Cumulative layout shift',
    },
    {
      name: 'INP',
      metric: metrics.INP,
      target: '<200ms',
      description: 'Interaction to next paint',
    },
  ];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white ${className}`}>
      {/* WebGL Background */}
      {enableBackground && isClient && <HeroBackground />}

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                Live Performance Monitor
              </span>
            </motion.div>

            {/* Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl"
              >
                Vibe Wiki
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-blue-100 sm:text-xl lg:text-2xl lg:leading-relaxed"
              >
                Transform complex technical concepts into digestible, animated mental models. Master web development through plain English explanations, real-world analogies, and interactive 3D visualizations.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold text-blue-100">{stat.label}</div>
                  <div className="mt-1 text-xs text-blue-200/70">{stat.description}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="#main-content"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Explore Concepts
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Advanced Search
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual & Metrics */}
          <div className="space-y-6">
            {/* 3D Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
              aria-hidden="true"
            >
              {isClient && <HeroOrbitalScene />}
            </motion.div>

            {/* Live Metrics */}
            {showMetrics && isClient && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold uppercase tracking-wide text-blue-100">
                    Web Vitals
                  </span>
                  <span className="text-xs text-blue-200/70">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {metricsData.map((data) => (
                    <MetricDisplay key={data.name} {...data} />
                  ))}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-blue-100/80 backdrop-blur-sm">
                  💡 <strong>Real-time monitoring:</strong> Metrics update as you interact with the page. Lower values = better performance.
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#main-content"
            className="flex flex-col items-center gap-2 text-blue-100 transition-opacity hover:opacity-80"
            aria-label="Scroll to main content"
          >
            <span className="text-xs font-semibold uppercase tracking-wider">Scroll to explore</span>
            <svg
              className="h-6 w-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroEnhanced;
