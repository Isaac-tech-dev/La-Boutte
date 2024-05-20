const Cart = require("../models/cartModel");
const Pizza = require("../models/pizzaModel");

// Add an item to the cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate input
  if (!userId || !productId || quantity === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the product to get the productName
    const product = await Pizza.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productName = product.name;

    // Find the cart for the given user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      // If the product exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the product does not exist, add it to the cart
      cart.items.push({ productId, productName, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart", error });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  // Validate input
  if (!productId) {
    return res
      .status(400)
      .json({ message: "Missing required field: productId" });
  }

  try {
    // Find the cart containing the specified product
    const cart = await Cart.findOne({ "items.productId": productId });

    if (!cart) {
      return res.status(404).json({ message: "Product not found in any cart" });
    }

    // Find the index of the item to remove
    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Remove the item from the cart
    if (index !== -1) {
      cart.items.splice(index, 1);

      // Save the updated cart
      await cart.save();
    }

    res
      .status(200)
      .json({ message: "Item removed from cart successfully", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Failed to remove item from cart", error });
  }
};

// Delete Cart
const deleteCart = async (req, res) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return res.status(400).json({ message: "Missing required field: userId" });
  }

  try {
    // Find and remove the cart by userId
    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ message: "Failed to delete cart", error });
  }
};

// Fetch all items in the cart for a specific user
const fetchAllCart = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log("Fetching cart for userId:", userId);

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId", // Path to the field to populate
      model: "Pizza", // Model to use for populating
    });

    //console.log("Fetched cart:", cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart Fetched Successfully", cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  deleteCart,
  fetchAllCart,
};
