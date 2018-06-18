const staticAssests = [
    './',
    './manifest.json',
    './app.js',
    './index.html',
    './main.css',
    './login.html',
    './register.html',
    './register2.html',
    './register3_user.html',
    './dash_customer_home.html',
    './dash_home.html',
    './dash_course.html',
    './dash_user_home.html',
    './customer_dash.html',
    './dash_home.html',
    './dash_post.html',
    "./dash_profile.html",
    './postpage.html'
];

self.addEventListener('install', async event=>{
   const cache = await caches.open('dreamster-static');
    cache.addAll(staticAssests);
   
});

self.addEventListener('fetch', event=>{
   const req = event.request;
   //event.respondWith(cacheFirst(req));
    const url = new URL(req.url);

    if(url.origin == location.origin){
        event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkFirst(req));
    } 
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req){
    const cache = await caches.open('dreamster-dynamic');

    try{
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    }catch(error){
        return  await cache.match(req);
    }
} 