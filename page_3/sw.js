self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/page_3/',
        '/page_3/index.html',
        '/page_3/style.css',
        '/page_3/app.js',
        '/page_3/image-list.js',
        '/page_3/star-wars-logo.jpg',
        // '/page_3/gallery/body.png',
        // '/page_3/gallery/page.png',
        '/page_3/gallery/title.png'
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
        return caches.match('/page_3/gallery/page.png');
      });
    }
  }));
});
