const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming the image will be stored as a URL
    required: true,
  },
  // Add more fields as needed
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
