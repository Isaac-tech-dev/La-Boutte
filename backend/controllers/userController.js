const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


// Register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmpassword } = req.body;

  // Check if passwords match
  if (password !== confirmpassword) {
    return res.status(400).setHeader('Content-Type', 'application/json').json({ error: "Passwords don't match" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).setHeader('Content-Type', 'application/json').json({ message: "User Created Successfully",user});
  } catch (error) {
    res.status(400).setHeader('Content-Type', 'application/json').json({ error: error.message });
  }
};
// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).setHeader('Content-Type', 'application/json').json({ error: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).setHeader('Content-Type', 'application/json').json({ error: "Invalid password" });
    }

    // Generate JWT accessToken
    const accessToken = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).setHeader('Content-Type', 'application/json').json({ message: "Login Successful", user, accessToken });
  } catch (error) {
    res.status(500).setHeader('Content-Type', 'application/json').json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
