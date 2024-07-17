const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setGCMAPIKey(process.env.GCM_API_KEY)

webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);


app.post('/subscribe', (req, res) => {
    const subscription = req.body;
  
    console.log('Subscription received:', subscription); // Log the subscription object
  
    res.status(201).json({});
  
    const payload = JSON.stringify({ title: 'Push Test' });
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error('Error sending notification:', error);
    });
  });

app.get('/vapidPublicKey', (req, res) => {
    res.send(process.env.PUBLIC_VAPID_KEY);
  });
  

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
