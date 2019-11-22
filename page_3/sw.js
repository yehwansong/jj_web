self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'jj_web/page_3/',
        'jj_web/page_3/index.html',
        'jj_web/page_3/style.css',
        'jj_web/page_3/app.js',
        'jj_web/page_3/image-list.js',
        'jj_web/page_3/star-wars-logo.jpg',
        // 'jj_web/page_3/gallery/body.png',
        // 'jj_web/page_3/galleryjj_web/page.png',
        'jj_web/page_3/gallery/title.png'
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
        return caches.match('jj_web/page_3/galleryjj_web/page.png');
      });
    }
  }));
});
