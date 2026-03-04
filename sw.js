const CACHE_NAME = 'snap-studio-v6';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // บังคับอัปเดตทันที
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  // ลบแคชเวอร์ชันเก่าทิ้งให้หมด จะได้ไม่เจอผีหลอก (โค้ดเก่าค้าง)
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key); 
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method === 'POST') return; 
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
