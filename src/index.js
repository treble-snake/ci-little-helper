const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const MiddlewareFactory = require('../src/middleware/MiddlewareFactory');

const app = express({});

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(MiddlewareFactory.parseCommonRequest());
app.use(MiddlewareFactory.checkSecurity());

app.use('/', require('../src/controllers/EventRouter'));

// 404 handler
app.use((req, res) => res.status(404).json({code: 'Bad route'}));
// 500 handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({code: 'internal'})
});

module.exports = app;