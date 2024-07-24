self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  // self.registration.unregister()
  //   .then(function () {
  //     return self.clients.matchAll()
  //   })
  //   .then(function (clients) {
  //     clients.forEach(client => client.navigate(client.url))
  //   })
})

self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push received:', data); // Log the received push data
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: './icon.svg',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  });
});
