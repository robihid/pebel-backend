const config = require('config');

module.exports = () => {
  if (!config.get('secretKey')) {
    throw new Error('FATAL ERROR: secretKey is not defined.');
  }
};
