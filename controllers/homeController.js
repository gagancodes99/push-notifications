const renderWithLayout = require('../utils/renderWithLayout');

exports.getHomePage = (req, res) => {
  renderWithLayout(res, 'index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
};
