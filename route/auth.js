const express = require("express");
const { signup, login, deleteUser } = require("../controller/auth");
const router = express.Router();
const cors = require("cors");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
