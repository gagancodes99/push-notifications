const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// // Connect to MongoDB
// const connectDB = require('./config/database');
// connectDB();

//Middleware
app.use(bodyParser.json());

//Set view engine to ejs
app.set('view engine','ejs')
//set the directory for views
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const pushNotificationRoutes = require('./routes/pushNotifications')

app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/push_notifications',pushNotificationRoutes)


//start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
