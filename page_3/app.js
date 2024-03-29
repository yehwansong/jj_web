// register service worker
// navigator.serviceWorker.getRegistrations().then(function(registrations) {
//  for(let registration of registrations) {
//   registration.unregister()
// } })
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('jj_web/page_3/sw.js', { scope: 'jj_web/page_3/' }).then(function(reg) {
    // var counter
    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

// function for loading each image via XHR

function imgLoad(imgJSON) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', imgJSON.url);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = imgJSON;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

var imgSection = document.querySelector('section');

window.onload = function() {

  // load each set of image, alt text, name and caption
  for(var i = 0; i<=Gallery.images.length-1; i++) {
    imgLoad(Gallery.images[i]).then(function(arrayResponse) {

      var myImage = document.createElement('img');
      var myFigure = document.createElement('figure');
      var imageURL = window.URL.createObjectURL(arrayResponse[0]);

      myImage.src = imageURL;
      myImage.setAttribute('id', arrayResponse[1].id);

      imgSection.appendChild(myFigure);
      myFigure.appendChild(myImage);

    }, function(Error) {
      console.log(Error);
      // counter++
    });
    
  }
};
// WifiManager wm = (WifiManager) getSystemService(WIFI_SERVICE);

// if (!wm.isWifiEnabled()) {
//   alert('nope')
// } else {
//     // wm.setWifiEnabled(false);
//     //Or do what you want in enable mode
// }
window.addEventListener('load', function() {
  // online()
  // function online() {
  //   console.log('1')
  //   console.log(navigator.onLine)
  //  if(!navigator.onLine){
  //   window.location.href = "..jj_web/page_1";
  //  }
  //  if(navigator.onLine){
  //   setTimeout(function(){online()}, 500);
  //  }
  //  }
});