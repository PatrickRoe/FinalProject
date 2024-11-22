// controllers/cartController.js
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import DiscountCode from "../models/DiscountCode.js";

// Get User Cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );

    if (!cart) {
      // If no cart exists for the user, create one
      cart = new Cart({ userId: req.user.id, products: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error("Get Cart Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Add Item to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, products: [] });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json([{ msg: "Product not found" }]);
    }

    // Check if item already exists in cart
    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.products[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.products.push({ productId, quantity, size });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Add to Cart Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Remove Item from Cart
export const removeFromCart = async (req, res) => {
  const { productId, size } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json([{ msg: "Cart not found" }]);
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId || item.size !== size
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Remove from Cart Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Apply Discount Code
export const applyDiscount = async (req, res) => {
  const { code } = req.body;

  try {
    const discount = await DiscountCode.findOne({ code });

    if (!discount) {
      return res.status(400).json({ message: "Invalid discount code" });
    }

    // Check if the discount code is expired
    if (discount.expiresAt && discount.expiresAt < new Date()) {
      return res.status(400).json({ message: "Discount code has expired" });
    }

    res.json({ amount: discount.amount });
  } catch (err) {
    console.error("Apply Discount Error:", err.message);
    res.status(500).send("Server Error");
  }
};
