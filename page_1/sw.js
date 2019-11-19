self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/page_1/',
        '/page_1/index.html',
        '/page_1/style.css',
        '/page_1/app.js',
        '/page_1/image-list.js',
        '/page_1/star-wars-logo.jpg',
        // '/page_1/gallery/body.png',
        // '/page_1/gallery/page.png',
        '/page_1/gallery/title.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/page_1/gallery/page.png');
      });
    }
  }));
});
