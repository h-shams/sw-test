self.addEventListener('install', function(e) {
 e.waitUntil(

   caches.keys().then( keys => {
     keys.forEach( cacheName => {
       caches.delete(cacheName)
     })
   })

   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/sw-test/a2hs/',
       '/sw-test/a2hs/index.html',
       '/sw-test/a2hs/index.js',
       '/sw-test/a2hs/style.css',
       '/sw-test/a2hs/images/fox1.jpg',
       '/sw-test/a2hs/images/fox2.jpg',
       '/sw-test/a2hs/images/fox3.jpg',
       '/sw-test/a2hs/images/fox4.jpg'
     ]);
   })
 );
});

self.addEventListener('push', function(e) {
  console.log('PUSH: ' + e.data);
})


self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
