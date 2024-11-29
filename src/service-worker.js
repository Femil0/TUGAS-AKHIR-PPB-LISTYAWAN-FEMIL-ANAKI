/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

clientsClaim();

const DATA_CACHE_NAME = "data-cache-v1";
const STATIC_CACHE_NAME = "static-cache-v1";

// Precaching semua aset yang disertakan dalam manifest build
precacheAndRoute(self.__WB_MANIFEST);

// Tambahkan halaman offline ke cache di install event
self.addEventListener('install', (event) => {
  console.log("Service Worker: Installing and caching offline assets");
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',                 // Cache halaman root
        '/index.html',       // Cache halaman utama HTML
        '/styles.css',       // Cache CSS utama
        '/offline.html'      // Cache halaman offline
      ]).then(() => console.log("All assets cached successfully"))
      .catch((err) => console.error("Failed to cache assets on install", err));
    })
  );
});

// Cache semua aset statis seperti JS, CSS, dan HTML
registerRoute(
  ({ request }) => request.destination === 'document' || 
                   request.destination === 'style' || 
                   request.destination === 'script' || 
                   request.destination === 'image',
  new CacheFirst({
    cacheName: STATIC_CACHE_NAME,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache selama 30 hari
      }),
    ],
  })
);

// Cache gambar menggunakan Stale-While-Revalidate
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Event fetch untuk memeriksa koneksi
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Cache khusus untuk endpoint data
  if (url.pathname.includes("/auto-complete")) {
    const cacheKey = `${DATA_CACHE_NAME}-${url.searchParams.get("q") || "default"}`;

    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(cacheKey, response.clone());
            return response;
          })
          .catch(() => {
            return cache.match(cacheKey);
          });
      })
    );
  } else {
    // Fallback ke cache untuk semua permintaan lain
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response; // Gunakan respons cache jika tersedia
        }
        return fetch(event.request).catch(() => {
          // Fallback ke halaman offline jika dokumen tidak tersedia dan offline
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
    );
  }
});

// Menerima pesan untuk mengaktifkan SKIP_WAITING
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Membersihkan cache lama saat aktivasi
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE_NAME, DATA_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete)));
    })
  );
});
