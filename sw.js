// Grove service worker: caches the app so it works offline.
const CACHE = 'grove-v1.3.1';
const PHOTOS = 'grove-photos';
const ASSETS = [
  './',
  'index.html',
  'lang.js',
  'extras.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'fonts/azeret-mono-latin-wght-normal.woff2',
  'fonts/azeret-mono-latin-ext-wght-normal.woff2',
  'fonts/instrument-sans-latin-wght-normal.woff2',
  'fonts/instrument-sans-latin-ext-wght-normal.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== PHOTOS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first for pages (so updates show up), cache first for everything else.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Background photos from Unsplash's CDN: keep a copy so the last ones seen also work offline.
  if (url.hostname === 'images.unsplash.com') {
    e.respondWith(caches.open(PHOTOS).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { c.put(req, res.clone()); c.keys().then((k) => k.slice(0, Math.max(0, k.length - 12)).forEach((r) => c.delete(r))); }
      return res;
    }))));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) if ('focus' in c) return c.focus();
      return self.clients.openWindow('./');
    })
  );
});
