const CACHE_NOMBRE = "nexo-v2";

self.addEventListener("install", function (evento) {

  self.skipWaiting();

});

self.addEventListener("activate", function (evento) {

  self.clients.claim();

});

self.addEventListener("fetch", function (evento) {

  evento.respondWith(
    caches.match(evento.request).then(function (respuestaCache) {

      if (respuestaCache) {

        return respuestaCache;

      }

      return fetch(evento.request)
        .then(function (respuestaRed) {

          return caches
            .open(CACHE_NOMBRE)
            .then(function (cache) {

              cache.put(
                evento.request,
                respuestaRed.clone()
              );

              return respuestaRed;

            });

        })
        .catch(function () {

          return respuestaCache;

        });

    })
  );

});
