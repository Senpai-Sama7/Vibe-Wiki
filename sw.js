/**
 * Service Worker for Vibe Wiki PWA
 * Handles caching, offline functionality, and background sync
 */

const STATIC_CACHE = 'vibe-wiki-static-v1.0.0';
const DYNAMIC_CACHE = 'vibe-wiki-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/globals.css',
  // Add other critical assets
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/api\/concepts/,
  /\/api\/progress/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');

  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      console.log('[SW] Caching static assets');

      try {
        await cache.addAll(STATIC_ASSETS);
        console.log('[SW] Static assets cached successfully');
      } catch (error) {
        console.error('[SW] Failed to cache static assets:', error);
        // Continue with installation even if caching fails
      }

      // Force activation of new service worker
      await self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');

  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name =>
        name !== STATIC_CACHE &&
        name !== DYNAMIC_CACHE &&
        name.startsWith('vibe-wiki')
      );

      await Promise.all(
        oldCaches.map(cacheName => {
          console.log('[SW] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );

      // Take control of all clients
      await self.clients.claim();
      console.log('[SW] Service worker activated and controlling clients');
    })()
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (!url.origin.includes(self.location.origin) && !url.origin.includes('fonts.googleapis.com')) return;

  // Handle API requests with network-first strategy
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (STATIC_ASSETS.includes(url.pathname) || url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Default: network-first for HTML pages
  event.respondWith(networkFirstStrategy(request));
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first strategy failed:', error);
    // Return offline fallback for critical assets
    if (request.destination === 'document') {
      return caches.match('/offline.html') || caches.match('/') || Response.error();
    }
    throw error;
  }
}

// Network-first strategy for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network request failed, trying cache:', error);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline fallback for HTML pages
    if (request.destination === 'document') {
      return caches.match('/offline.html') || caches.match('/') || Response.error();
    }

    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineData());
  }
});

// Push notifications (placeholder for future implementation)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');

  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      data: data.url,
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');

  event.notification.close();

  event.waitUntil(
    self.clients.openWindow(event.notification.data || '/')
  );
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync event:', event.tag);

  if (event.tag === 'content-update-check') {
    event.waitUntil(checkForContentUpdates());
  }
});

// Utility functions
async function syncOfflineData() {
  console.log('[SW] Syncing offline data');
  // Implement offline data sync logic here
  // This would typically involve IndexedDB operations
}

async function checkForContentUpdates() {
  console.log('[SW] Checking for content updates');
  // Implement content update checking logic here
  // This could prefetch new content or check for updates
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('[SW] Service worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});
