// const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY';

// Check for service worker support
if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

async function send() {
  // Register Service Worker
  const register = await navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'
  });

  // Register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey
  });

  // Send Push Notification
  await fetch('/push_notifications/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
