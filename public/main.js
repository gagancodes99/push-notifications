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

   // Get device info
   const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      }
  };

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

// Function to request notification permission
function requestNotificationPermission() {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
      return;
  }

  // Check the current permission status
  if (Notification.permission === "granted") {
      // If permission is already granted, you can show a notification directly
      showNotification("You have already granted permission!");
  } else if (Notification.permission === "denied") {
      // If permission is denied, you might want to inform the user
      alert("You have denied notification permissions. You can enable them in your browser settings.");
  } else {
      // If permission is default (neither granted nor denied), request permission
      Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
              // If permission is granted, show a notification
              showNotification("Thank you for granting permission!");
          } else {
              // If permission is denied, you might want to inform the user
              alert("You have denied notification permissions. You can enable them in your browser settings.");
          }
      });
  }
}
// Function to show a notification
function showNotification(message) {
  const options = {
      body: message,
      icon: './icon.svg' // Optional icon for the notification
  };
  new Notification("Notification Title", options);
}

// Function to unsubscribe from push notifications
async function unsubscribe() {
  // Check if the service worker and push manager are available
  if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
              await subscription.unsubscribe();
              console.log('Unsubscribed from push notifications');
              // Optionally, you might want to remove subscription data from your server
              // Example: send a request to your server to remove the subscription
              // await fetch('/unsubscribe', { method: 'POST', body: JSON.stringify({ endpoint: subscription.endpoint }) });
          } else {
              console.log('No subscription found');
          }
      } else {
          console.log('No service worker registered');
      }
  } else {
      console.log('Push notifications not supported');
  }
}
