
const cacheName = "files-v1"

const cacheAssets = [
    ".",
    "./index.html",
    "./assets/pages/resume.html",
    "./assets/pages/portfolio.html",
    "./assets/pages/contact.html",
    "./assets/css/style.css",
    "./assets/css/all.css",
    "./assets/js/script.js",
    "./assets/js/all.js",
    "./assets/js/anime.min.js",
    "./assets/js/typed.min.js",
    "./assets/img/resume/about-img.jpg",
    "./assets/img/resume/about.jpg",
    "./assets/img/contact/contact.jpg",
    "./assets/img/base/favicon.png",
    "./assets/img/home/home-img.png",
    "./assets/img/base/loader.gif",
    "./assets/img/portfolio/portfolio.jpg",
    "./assets/img/portfolio/work1.png",
    "./assets/img/portfolio/work2.png",
    "./assets/img/portfolio/work3.png",
    "./assets/img/portfolio/work4.png",
    "./assets/img/portfolio/work5.png",
  ];

/***---SERVICE WORKER INSTATLLATION EVENT---***/
self.addEventListener("install", async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(cacheAssets);
    return self.skipWaiting();
})

/***---SERVICE WORKER ACTIVATION EVENT---***/
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(thisCacheName => {
                        thisCacheName !== cacheName && caches.delete(thisCacheName);
                    })
                )
            })
    )
})



/***---FETCH EVENT CACHING---***/
const cacheFirst = async req => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}


/***---FETCH EVENT FETCHING AND CACHING---***/
const networkAndCache = async req => {
    const cache = await caches.open(cacheName);
    try{
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    }catch(e){
        const cached = await caches.match(req);
        return cached;
    }
}



/***---SERVICE WORKER FETCH EVENT---***/
self.addEventListener("fetch", e => {

    const req = e.request;
    const url = new URL(req.url);

    url.origin == location.origin ?
        e.respondWith(cacheFirst(req))
    :
        e.respondWith(networkAndCache(req))
})