// Service Worker for Zen Novel Court
// Provides offline caching for chapters

const CACHE_NAME = 'zen-novel-v1';
const CHAPTER_CACHE_PREFIX = 'chapters-';

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith(CHAPTER_CACHE_PREFIX))
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache-first for chapters, network-first for others
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  // Cache chapter pages
  if (url.pathname.match(/\/book\/.+\/\d+\//)) {
    event.respondWith(
      caches.open(CHAPTER_CACHE_PREFIX + getBookSlug(url.pathname)).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] Cache hit:', url.pathname);
            return cachedResponse;
          }

          console.log('[SW] Cache miss, fetching:', url.pathname);
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return offline page if available
            return new Response('Offline - Chapter not cached', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        });
      })
    );
    return;
  }

  // Network-first for other requests (API, etc)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Helper: Extract book slug from URL path
function getBookSlug(pathname) {
  const match = pathname.match(/\/book\/([^/]+)/);
  return match ? match[1] : 'unknown';
}

// Handle messages from client
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});