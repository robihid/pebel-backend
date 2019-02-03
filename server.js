const express = require('express');
const winston = require('winston');

const app = express();
app.use(express.json());
require('./startup/config')();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;
app.listen(3000, () => winston.info(`Listening on port ${port}...`));