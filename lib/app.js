const express = require('ezpress');
const app = express(app);

app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
