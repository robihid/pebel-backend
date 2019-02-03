const sequelize = require('../utils/database');
const User = require('../models/user');

module.exports = () => {
  // Set relations
  // Category.hasMany(Question);
  // User.hasMany(Question);
  // User.hasMany(Answer);
  // Question.hasMany(Answer);
  // User.belongsToMany(Answer, { through: Vote });
  // Answer.belongsToMany(User, { through: Vote });

  // sequelize.sync({ force: true });
  sequelize.sync();
};
