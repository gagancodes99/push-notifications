self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push received:', data); // Log the received push data
  self.registration.showNotification(data.title, {
    body: 'Notified by JavaScript App',
    icon: 'https://example.com/icon.png'
  });
});
