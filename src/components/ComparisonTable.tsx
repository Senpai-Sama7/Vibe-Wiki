'use client';

import { motion } from 'framer-motion';
import type { ComparisonItem } from '@/lib/content/schema';
import clsx from 'clsx';

interface ComparisonTableProps {
  items: ComparisonItem[];
  className?: string;
}

/**
 * ComparisonTable: Responsive comparison matrix component
 *
 * Features:
 * - Responsive design with mobile-friendly layout
 * - Animated reveals for better UX
 * - Accessible table structure with proper ARIA labels
 * - Color-coded pros/cons indicators
 */
export function ComparisonTable({ items, className }: ComparisonTableProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={clsx('overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700', className)}>
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Feature comparison">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white" scope="col">
                Feature
              </th>
              <th className="px-6 py-4 text-center font-semibold text-green-700 dark:text-green-400" scope="col">
                ✅ Pros
              </th>
              <th className="px-6 py-4 text-center font-semibold text-red-700 dark:text-red-400" scope="col">
                ❌ Cons
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white" scope="col">
                Use Case
              </th>
              {items.some(item => item.performance) && (
                <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white" scope="col">
                  Performance
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <motion.tr
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white" scope="row">
                  {item.name}
                </td>

                <td className="px-6 py-4">
                  <ul className="space-y-1">
                    {item.pros.map((pro, proIndex) => (
                      <motion.li
                        key={proIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: (index * 0.1) + (proIndex * 0.05) }}
                        className="flex items-start gap-2 text-sm text-green-700 dark:text-green-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" aria-hidden="true" />
                        {pro}
                      </motion.li>
                    ))}
                  </ul>
                </td>

                <td className="px-6 py-4">
                  <ul className="space-y-1">
                    {item.cons.map((con, conIndex) => (
                      <motion.li
                        key={conIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: (index * 0.1) + (conIndex * 0.05) }}
                        className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                        {con}
                      </motion.li>
                    ))}
                  </ul>
                </td>

                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {item.useCase}
                </td>

                {items.some(item => item.performance) && (
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {item.performance || '—'}
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
