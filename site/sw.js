// Portfolio Service Worker

// CACHE CONFIGURATION

const CACHE_VERSION = 'portfolio-v2';

const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Essential resources required for initial offline access.
const PRECACHE_URLS = [
    '/',
    '/index.html'
];

// INSTALL EVENT

self.addEventListener('install', event => {

    event.waitUntil(
        (async () => {

            const cache = await caches.open(STATIC_CACHE);

            // Cache essential resources.
            await cache.addAll(PRECACHE_URLS);

            // Activate the new Service Worker.
            await self.skipWaiting();

        })()
    );

});

// ACTIVATE EVENT

self.addEventListener('activate', event => {

    event.waitUntil(
        (async () => {

            const cacheNames = await caches.keys();

            // Remove caches belonging to previous versions.
            await Promise.all(
                cacheNames
                    .filter(cacheName =>
                        cacheName.startsWith('portfolio-') &&
                        cacheName !== STATIC_CACHE &&
                        cacheName !== DYNAMIC_CACHE
                    )
                    .map(cacheName => caches.delete(cacheName))
            );

            // Take control of existing open pages.
            await self.clients.claim();

        })()
    );

});

// NETWORK REQUEST HANDLER

self.addEventListener('fetch', event => {

    const request = event.request;

    // Only process GET requests.
    if (request.method !== 'GET') {
        return;
    }

    const requestURL = new URL(request.url);

    // Ignore external requests.
    if (requestURL.origin !== self.location.origin) {
        return;
    }

    event.respondWith(networkFirst(request));

});

// NETWORK-FIRST STRATEGY

async function networkFirst(request) {

    let networkResponse;

    try {

        // Force HTTP cache revalidation.
        const networkRequest = new Request(request, {
            cache: 'no-cache'
        });

        networkResponse = await fetch(networkRequest);

    } catch (error) {

        // Network unavailable: retrieve cached content.
        return offlineFallback(request);

    }

    // CACHE SUCCESSFUL NETWORK RESPONSES

    const cacheControl = (
        networkResponse.headers.get('Cache-Control') || ''
    ).toLowerCase();

    const shouldCache =
        networkResponse.ok &&
        networkResponse.type === 'basic' &&
        networkResponse.status === 200 &&
        !cacheControl.includes('no-store');


    if (shouldCache) {

        try {

            const cache = await caches.open(DYNAMIC_CACHE);

            await cache.put(
                request,
                networkResponse.clone()
            );

        } catch (cacheError) {
            console.warn(
                'Unable to update cache:',
                cacheError
            );

        }

    }

    // Always return the network response when available.
    return networkResponse;

}

// OFFLINE FALLBACK

async function offlineFallback(request) {

    // First, retrieve previously cached content.
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }


    // Use the cached homepage for navigation requests.
    if (request.mode === 'navigate') {

        const staticCache = await caches.open(STATIC_CACHE);

        const cachedHomepage = await staticCache.match('/');

        if (cachedHomepage) {
            return cachedHomepage;
        }

        // Last resort generate a minimal offline response.
        return new Response(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="robots" content="noindex, nofollow">
                <title>Offline | Willians Rico</title>
            </head>
            <body>
                <main>
                    <h1>You're offline</h1>
                    <p>
                        Your connection is unavailable.
                        Please reconnect to the internet and try again.
                    </p>
                </main>
            </body>
            </html>`,
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                }
            }
        );

    }


    // Resource unavailable and not cached.
    return new Response(
        'Resource unavailable while offline.',
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            }
        }
    );

}