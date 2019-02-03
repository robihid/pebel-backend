const Sequelize = require('sequelize');

const sequelize = new Sequelize('pebel', 'gwp', 'gwp', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequelize;
