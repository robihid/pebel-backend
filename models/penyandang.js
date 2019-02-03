const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const config = require("config");

const sequelize = require("../utils/database");

const Penyandang = sequelize.define("penyandang", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nama: {
    type: Sequelize.STRING,
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
  jenisKelamin: Sequelize.BOOLEAN,
  tglLahir: Sequelize.DATE,
  alamat: Sequelize.TEXT,
  kota: Sequelize.STRING,
  noHp: Sequelize.STRING,
  deskripsi: Sequelize.TEXT
});

Penyandang.prototype.getAuthToken = function() {
  const token = jwt.sign(
    { id: this.id, role: "penyandang" },
    config.get("secretKey")
  );
  return token;
};

module.exports = Penyandang;
