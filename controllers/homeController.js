const SubscriptionModel = require('../models/subscriptionModel');
const renderWithLayout = require('../utils/renderWithLayout');

exports.getHomePage = async(req, res) => {
  const subscriptions = await SubscriptionModel.find()
  renderWithLayout(res, 'index', { title: 'Home Page', subscriptions:subscriptions });
};
