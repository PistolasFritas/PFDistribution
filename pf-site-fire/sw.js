/* PF Distribution service worker — minimal pass-through.
   Registered by all pages; exists to avoid 404s and reserve
   the scope for future offline caching. No caching is done here
   so content updates are always fetched fresh. */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
