const express = require("express");
const { getAllPizza } = require("../controllers/pizzaController");
const { getPizzaFromDB, createPizza } = require("../controllers/pizzaController");

//Create Express App
const router = express.Router();

//GET REQUEST (ALL PIZZA)
router.get("/", getPizzaFromDB);
//router.get("/db", getPizzaFromDB);

//POST REQUEST (POST PIZZA)
router.post("/", createPizza);

module.exports = router;
