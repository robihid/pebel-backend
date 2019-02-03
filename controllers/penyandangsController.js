const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const Penyandang = require("../models/penyandang");

exports.register = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let penyandang = await Penyandang.findOne({
    where: { email: req.body.email }
  });
  if (penyandang) return res.status(400).send("Penyandang already registered!");

  penyandang = new Penyandang(_.pick(req.body, ["nama", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  penyandang.password = await bcrypt.hash(penyandang.password, salt);

  await penyandang.save();

  const token = penyandang.getAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(penyandang, ["id", "nama", "email"]));
};

exports.login = async (req, res) => {
  let penyandang = await Penyandang.findOne({
    where: { email: req.body.email }
  });
  if (!penyandang) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    penyandang.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = penyandang.getAuthToken();
  res.send(token);
};

exports.myProfile = async (req, res) => {
  const penyandang = await Penyandang.findByPk(req.user.id, {
    attributes: {
      exclude: ["password"]
    }
  });
  res.send(penyandang);
};

// exports.editProfile = async (req, res) => {
//   const penyandang = await Penyandang.findByPk(req.user.id, {
//     attributes: {
//       exclude: ["password"]
//     }
//   });
//   penyandang.jenisKelamin = req.body.jenisKelamin;
//   penyandang.tglLahir = req.body.tglLahir;
//   penyandang.alamat = req.body.alamat;
//   penyandang.kota = req.body.kota;
//   penyandang.noHp = req.body.noHp;
//   penyandang.deskripsi = req.body.deskripsi;
//   penyandang.update();
//   res.send(penyandang);
// };

function validate(req) {
  const schema = {
    nama: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required()
    // jenisKelamin: Joi.boolean(),
    // tglLahir: Joi.date(),
    // alamat: Joi.string(),
    // kota: Joi.string(),
    // noHp: Joi.string(),
    // deskripsi: Joi.string()
  };

  return Joi.validate(req, schema);
}
