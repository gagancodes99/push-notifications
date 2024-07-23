const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
//Set view engine to ejs
app.set('view engine','ejs')
//set the directory for views
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;


webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);


app.post('/subscribe', (req, res) => {
    const subscription = req.body;
  
    // console.log('Subscription received:', subscription); // Log the subscription object
  
    // addSubscription(subscription) 

    res.status(201).json({});
  
    const payload = JSON.stringify({ title: 'Push Test' });
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error('Error sending notification:', error);
    });

    // console.log(getSubscriptions().length)
  });

app.get('/vapidPublicKey', (req, res) => {
    res.send(process.env.PUBLIC_VAPID_KEY);
  });
  
// Use routes
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
