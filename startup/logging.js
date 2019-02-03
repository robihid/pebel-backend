const winston = require('winston');
require('express-async-errors');

module.exports = () => {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );
  process.on('unhandledRejection', e => {
    throw e;
  });

  winston.add(winston.transports.File, { filename: 'logfile.log' });
};
