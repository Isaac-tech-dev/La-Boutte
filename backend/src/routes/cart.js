const express = require("express");
const {
  fetchAllCart,
  addToCart,
  removeFromCart,
  deleteCart,
} = require("../controllers/cartController");

//Create Express App
const router = express.Router();

//GET REQUEST (ALL PIZZA)
router.get("/fetch-cart/:userId", fetchAllCart);

//POST REQUEST (POST PIZZA)
router.post("/addToCart", addToCart);

//DELETE ITEM FROM CART
router.delete("/delete-product/:productId", removeFromCart);
router.delete("/delete-cart/:userId", deleteCart);

module.exports = router;
