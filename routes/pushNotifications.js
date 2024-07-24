const express = require('express')
const pushNotificationsController = require('../controllers/pushNotificationsController')
const router = express.Router()

router.get('/vapidPublicKey',pushNotificationsController.vapidPublickey)

router.post('/subscribe',pushNotificationsController.subscribe)

router.post('/send_notification',pushNotificationsController.sendNotification)

module.exports = router