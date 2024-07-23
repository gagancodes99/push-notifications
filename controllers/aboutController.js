const renderWithLayout = require('../utils/renderWithLayout');

exports.getAboutPage = (req, res) => {
  renderWithLayout(res, 'about', { title: 'About Us', content: 'This is the about page content' });
};
