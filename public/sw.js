const CACHE_NAME = 'specialist-plus-cache-v1';
const urlsToCache = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/doctors',
  '/forms',
  '/manifest.json',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/maskable-icon.png',
];

// Detect if we're in a development environment
const isDevelopment = self.location.hostname === 'localhost' || 
                      self.location.hostname === '127.0.0.1' ||
                      self.location.hostname.includes('.local');

// Install service worker and cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // In development, try to cache each URL individually to avoid failure of entire batch
      if (isDevelopment) {
        console.log('Service Worker: Development mode detected, caching resources individually');
        const cachePromises = urlsToCache.map(url => {
          // Attempt to cache each resource individually and ignore failures
          return cache.add(url).catch(error => {
            console.warn(`Failed to cache ${url}: ${error.message}`);
            return Promise.resolve(); // Continue despite error
          });
        });
        return Promise.all(cachePromises);
      } else {
        // In production, use standard cache.addAll
        return cache.addAll(urlsToCache);
      }
    })
  );
});

// Fetch event - Serve cached content if available
self.addEventListener('fetch', (event) => {
  // Prevent uncaught errors in fetch handler
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.warn('Service Worker fetch failed:', error);
        return fetch(event.request); // Try network anyway
      })
  );
});

// Activate and remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
