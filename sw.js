// Service worker: makes the site installable and lets it start offline after the first visit.
// Always asks the network first and bypasses the browser's HTTP cache, so a new build shows up
// on the next launch; the offline copy is only used when there's no connection.
const CACHE = 'cheatcell-v15';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./manifest.webmanifest', './icon-192.png', './icon-512.png']))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req, { cache: 'no-store' }).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return r; }).catch(() => caches.match(req)));
});
