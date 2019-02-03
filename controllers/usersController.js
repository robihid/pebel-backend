const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const Op = require('sequelize').Op;

exports.register = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.find({
    where: {
      [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
    }
  });
  if (user) {
    if (user.username == req.body.username)
      return res.status(400).send('username already exists');
    else return res.status(400).send('User already registered');
  }

  user = new User(
    _.pick(req.body, ['name', 'username', 'email', 'password', 'photoUrl'])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.getAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['id', 'name', 'username', 'email', 'photoUrl']));
};

exports.login = async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.find({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.getAuthToken();
  res.send(token);
};

exports.myProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: {
      exclude: ['password']
    }
  });
  res.send(user);
};

function validate(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    username: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required(),
    photoUrl: Joi.string()
  };

  return Joi.validate(user, schema);
}
