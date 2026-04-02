const CACHE = 'dripiq-v2';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(e.request.url.includes('.html') ? fetch(e.request).catch(()=>caches.match(e.request)) : caches.match(e.request).then(r=>r||fetch(e.request))); });
