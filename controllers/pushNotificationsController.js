const webpush = require('web-push');
const SubscriptionModel = require('../models/subscriptionModel');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:gagangrewal1999@gmail.com', publicVapidKey, privateVapidKey);

let subscriptions = []

const pushNotificationsController = {

    vapidPublickey: async(req,res) => {
        res.send(process.env.PUBLIC_VAPID_KEY);
    },

    subscribe:async(req,res)=>{
        try{

            const subscription = req.body;
            // console.log('Subscription received:', subscription);
            // await SubscriptionModel.create(subscription)
            subscriptions.push(subscription)
            res.status(201).json({});
      
            // const payload = JSON.stringify({ title: 'Push Test' });
        
            // webpush.sendNotification(subscription, payload).catch(error => {
            // console.error('Error sending notification:', error);
            // });

        }catch(err){
            res.status(400).json({ error: err.message });
        }
    },

    allSubscriptions:async(req,res)=>{
        // try{
        //     const subscriptions = await SubscriptionModel.find();
        //     return subscriptions
        // }catch(err){
        //     throw error
        // }
    },

    sendNotification:async(req,res)=>{
        try{

            const payload = JSON.stringify(req.body)
            console.log(payload)
            // const subscriptions = await SubscriptionModel.find();
            res.status(201).json("Sent")
            subscriptions.forEach((subscription)=>{
    
                webpush.sendNotification(subscription, payload).catch(error => {
                    console.error('Error sending notification:', error);
                });
            })
        }catch(err){
            res.status(500)
        }
    }
    
}

module.exports = pushNotificationsController