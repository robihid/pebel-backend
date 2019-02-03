const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('config');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.prototype.getAuthToken = function() {
  const token = jwt.sign({ id: this.id }, config.get('secretKey'));
  return token;
};

module.exports = User;
