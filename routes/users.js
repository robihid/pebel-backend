const express = require("express");

const usersController = require("../controllers/usersController");
const auth = require("../middlewares/auth");

const router = express.Router();

// POST /api/users/register
router.post("/register", usersController.register);

// POST /api/users/login
router.post("/login", usersController.login);

// // GET /api/myProfile
// router.get('/myProfile', auth, usersController.myProfile);

module.exports = router;
