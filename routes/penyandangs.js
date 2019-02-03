const express = require("express");

const auth = require("../middlewares/auth");

const penyandangsController = require("../controllers/penyandangsController");
// const auth = require('../middlewares/auth');

const router = express.Router();

// POST /api/penyandangs/register
router.post("/register", penyandangsController.register);

// POST /api/penyandangs/login
router.post("/login", penyandangsController.login);

// GET /api/myProfile
router.get("/myProfile", auth, penyandangsController.myProfile);

// // GET /api/myProfile
// router.put("/editProfile", auth, penyandangsController.editProfile);

module.exports = router;
