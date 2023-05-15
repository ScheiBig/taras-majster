// Name of the Cache.
const CACHE = "cacheV1";

// Select files for caching.
let urlsToCache = [
    "index.html",
    "AngleRuler2.js",
    "AngleRuler2.js.LICENSE.txt",
    "AngleRuler2.js.map",
    "i_16.png",
    "i_32.png",
    "i_64.png",
    "i_96.png",
    "i_192.png",
    "i_512.png",
    "index.html",
    "manifest.webmanifest",
    "sw.js"
];

// Cache all the selected items once application is installed.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            console.log("Caching started.");
            return cache.addAll(urlsToCache);
        })
    );
});

// Whenever a resource is requested, return if its cached else fetch the resourcefrom server.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
