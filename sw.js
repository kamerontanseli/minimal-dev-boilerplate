var CACHENAME = "js13kPWA-v1.0.0";

self.addEventListener("install", event => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open(CACHENAME).then(cache => {
      console.log("[Service Worker] Caching resources");
      return cache.addAll([
        "/",
        "/index.html",
        "/web_modules/choo/dist/bundle.js",
        "/web_modules/nanohtml.js",
        "/web_modules/es-module-shims.js",
        "/src/index.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(response => {
          return caches.open(CACHENAME).then(cache => {
            console.log(
              "[Service Worker] Caching new resource: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('js13kPWA-') && cacheName !== CACHENAME)
          .map(cacheName => caches.delete(cacheName))
      )
    })
  )
});
