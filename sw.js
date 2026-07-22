const CACHE_NAME = "uk-memes-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",

    "./meme.html",
    "./chat.html",
    "./notification.html",
    "./video.html",
    "./text.html",
    "./saved.html",

    "./style.css",
    "./home.css",

    "./firebase.js",
    "./common.js",
    "./auth.js",
    "./meme.js",
    "./chat.js",
    "./notification.js",
    "./video.js",
    "./text.js",
    "./saved.js",

    "./manifest.json"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request).then(response => {

            return response || fetch(event.request);

        })

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))

            );

        })

    );

});