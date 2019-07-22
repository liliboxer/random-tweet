const request = require('superagent');

function randomQuote() {
  return request
    .get('http://futuramaapi.herokuapp.com/')
    .then(res => res.body);
}

module.exports = { randomQuote };
