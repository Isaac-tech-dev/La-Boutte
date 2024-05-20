const Pizza = require("../models/pizzaModel");

//INTEGRATION WITH AN OUTSIDE API
const mongoose = require("mongoose");
const axios = require("axios");

const getAllPizza = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://pizza-and-desserts.p.rapidapi.com/pizzas/1",
    headers: {
      "X-RapidAPI-Key": "25208b0f38mshd6b9f36db021ad8p1f1b9djsn91aedec65da0",
      "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    // Map the data to match your schema structure
    // const pizzaData = {
    //   name: response.data.name,
    //   price: response.data.price,
    //   description: response.data.description,
    //   image: response.data.img, // Assuming 'img' field in the API response corresponds to 'image' in your schema
    // };

    // Insert the mapped data into the database
    //const newPizza = new Pizza(pizzaData);
    //await newPizza.save();
    //await Pizza.insertMany(response.data);
    const result = await Pizza.insertMany(response.data, { ordered: false, rawResult: true });
    console.log(result);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ message: "Products Fetch Successfully", data: response.data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .setHeader("Content-Type", "application/json")
      .json({ error: "Internal Server Error" }); // Send an error response
  }
};

// Retrieve pizza data from the database
const getPizzaFromDB = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res
      .status(200)
      .json({ message: "Products Fetch Successfully", data: pizzas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Send an error response
  }
};

//POST PIZZA
const createPizza = async (req, res) => {
  const { name, price, description, image } = req.body;

  //Add data to DB
  try {
    const pizza = await Pizza.create({ name, price, description, image });
    res.status(200).json(pizza);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllPizza,
  getPizzaFromDB,
  createPizza,
};
