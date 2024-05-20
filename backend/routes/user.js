const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");


//Create Express App
const router = express.Router();


//SIGN UP
router.post("/signup", registerUser);
//SIGN IN
router.post("/signin", loginUser);


module.exports = router;
