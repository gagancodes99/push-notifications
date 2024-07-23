const webpush = require('web-push');
const SubscriptionModel = require('../models/subscriptionModel');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:gagangrewal1999@gmail.com', publicVapidKey, privateVapidKey);

const pushNotificationsController = {

    vapidPublickey: async(req,res) => {
        res.send(process.env.PUBLIC_VAPID_KEY);
    },

    subscribe:async(req,res)=>{
        try{

            const subscription = req.body;
            // console.log('Subscription received:', subscription);
            await SubscriptionModel.create(subscription)

            res.status(201).json({});
      
            const payload = JSON.stringify({ title: 'Push Test' });
        
            webpush.sendNotification(subscription, payload).catch(error => {
            console.error('Error sending notification:', error);
            });

        }catch(err){
            res.status(400).json({ error: err.message });
        }
    },

    allSubscriptions:async(req,res)=>{
        try{
            const subscriptions = await SubscriptionModel.find();
            res.status(200).json(subscriptions);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
    
}

module.exports = pushNotificationsController