self.oninstall = function() {
    caches.open('WeatherApp')
    .then(function(cache) {
        cache.addAll([
            '/',
            'index.html'
        ])
        .then(function() {
            console.log("Cached all files");
        })
        .catch(function(err){
            console.error("Failed to cache", err);
        })
    })
}

self.onactivate = function() {
    console.log('activated');
}

self.onfetch = function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if(response) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    )
}