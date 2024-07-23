const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    endpoint:String,
    expirationTime: Date,
    keys:{
        auth: String,
        p256dh: String
    }
})

const SubscriptionModel = mongoose.model('subscription',subscriptionSchema)

module.exports = SubscriptionModel