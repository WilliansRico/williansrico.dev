/*
 * Portfolio Service Worker
 */

// CACHE CONFIGURATION

const CACHE_VERSION = 'portfolio-v1';

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

            await cache.addAll(PRECACHE_URLS);

            // Activate the new Service Worker right away.
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


// NETWORK-FIRST APPROACH

async function networkFirst(request) {

    const cache = await caches.open(DYNAMIC_CACHE);

    try {

        // Force HTTP cache revalidation.
        const networkRequest = new Request(request, {
            cache: 'no-cache'
        });

        const networkResponse = await fetch(networkRequest);

        // Only cache successful, complete responses.
        if (
            networkResponse &&
            networkResponse.ok &&
            networkResponse.type === 'basic' &&
            networkResponse.status === 200 &&
            networkResponse.headers.get('Cache-Control')?.includes('no-store') !== true
        ) {

            await cache.put(
                request,
                networkResponse.clone()
            );

        }

        return networkResponse;

    } catch (error) {

        // Network unavailable: retrieve previously cached content.
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // Navigation fallback.
        if (request.mode === 'navigate') {

            const offlinePage = await caches.match('/');

            if (offlinePage) {
                return offlinePage;
            }

            return new Response(
                `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Offline | Willians Rico</title>
                    <style>
                        body {
                            margin: 0;
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: Arial, sans-serif;
                            background: #f8fafc;
                            color: #1e293b;
                            text-align: center;
                        }

                        main {
                            padding: 30px;
                            max-width: 450px;
                        }

                        h1 {
                            color: #4f46e5;
                        }

                        p {
                            line-height: 1.6;
                        }
                    </style>
                </head>
                <body>
                    <main>
                        <h1>You're offline</h1>
                        <p>
                            Your connection is unavailable.
                            Please reconnect to the internet
                            and try again.
                        </p>
                    </main>
                </body>
                </html>`,
                {
                    status: 200,
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

}