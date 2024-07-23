const ejs = require('ejs');
const path = require('path');

function renderWithLayout(res, view, options = {}) {
  const { title, ...rest } = options;

  // Render the view to a string
  ejs.renderFile(path.join(__dirname, '../views/' + view + '.ejs'), rest, (err, html) => {
    if (err) {
      console.error('Error rendering view:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the layout with the view content
    ejs.renderFile(path.join(__dirname, '../views/layouts/main.ejs'), { title, body: html }, (err, layoutHtml) => {
      if (err) {
        console.error('Error rendering layout:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Send the final HTML
      res.send(layoutHtml);
    });
  });
}

module.exports = renderWithLayout;
