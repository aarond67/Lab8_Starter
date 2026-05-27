// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-8-starter';

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6. TODO - Add all of the URLs from RECIPE_URLs here so that they are
      //            added to the cache when the ServiceWorker is installed
      return cache.addAll([]);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  // B7. Respond to the event by opening the cache
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      // B8. Check if request is already in the cache
      return cache.match(event.request).then(function (cachedResponse) {
        // If it is in the cache, return the cached version
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch it from the network
        return fetch(event.request).then(function (networkResponse) {
          // Add the network response to the cache
          cache.put(event.request, networkResponse.clone());

          // Return the network response
          return networkResponse;
        });
      });
    })
  );
});