const { randomQuote } = require('../services/api');

module.exports = (req, res, next) => {
  randomQuote()
    .then(quote => {
      req.quote = quote[0];
      next();
    });
};