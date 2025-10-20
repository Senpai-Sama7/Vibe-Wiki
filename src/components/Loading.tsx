'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

/**
 * LoadingSpinner: Accessible loading indicator
 * 
 * Features:
 * - Multiple sizes
 * - Color variants
 * - Accessibility labels
 * - Smooth animations
 */
export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const colorClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-gray-500 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  animate?: boolean;
}

/**
 * LoadingSkeleton: Content placeholder while loading
 */
export function LoadingSkeleton({
  className,
  lines = 1,
  animate = true,
}: LoadingSkeletonProps) {
  return (
    <div className={clsx('space-y-3', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'h-4 bg-gray-200 rounded',
            animate && 'animate-pulse',
            i === lines - 1 && lines > 1 && 'w-3/4' // Last line shorter
          )}
        />
      ))}
    </div>
  );
}

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * LoadingDots: Three-dot loading animation
 */
export function LoadingDots({ className, size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
    <motion.div
      className={clsx('flex gap-1.5', className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={clsx('rounded-full bg-blue-500', sizeClasses[size])}
          variants={dotVariants}
          transition={{ duration: 0.5 }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </motion.div>
  );
}

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  backdrop?: boolean;
}

/**
 * LoadingOverlay: Full-screen loading overlay
 */
export function LoadingOverlay({
  visible,
  message = 'Loading...',
  backdrop = true,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <motion.div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        backdrop && 'bg-black/50 backdrop-blur-sm'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm mx-4">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="xl" />
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface LoadingCardProps {
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
}

/**
 * LoadingCard: Skeleton for card components
 */
export function LoadingCard({ className, aspectRatio = 'square' }: LoadingCardProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
  };

  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <div className={clsx('bg-gray-200 animate-pulse', aspectClasses[aspectRatio])} />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      </div>
    </div>
  );
}

/**
 * FullPageLoader: Loading state for entire page
 */
export function FullPageLoader({ message = 'Loading Vibe Wiki...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner size="xl" color="white" className="mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">{message}</h2>
          <LoadingDots className="justify-center" />
        </motion.div>
      </div>
    </div>
  );
}
