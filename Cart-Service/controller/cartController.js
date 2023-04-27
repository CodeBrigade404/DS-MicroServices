//const Cart = require('../model/cartmodel');
import Cart from "../model/cartmodel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // If cart does not exist, create a new cart
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.items.find((item) => item.productId === productId);

    if (existingProduct) {
      // If the product already exists, update the quantity and price
      existingProduct.quantity += quantity;
      existingProduct.price += price;
    } else {
      // If the product does not exist, add a new item to the cart
      cart.items.push({ productId, quantity, price });
    }

    // Add total to each item
    cart.items = cart.items.map((item) => {
      const total = item.quantity * item.price;
      return { ...item, total };
    });

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


  const getCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const cartItems = await Cart.find({ userId });
      const items = cartItems[0].items;
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  
const updateCartQuantity = async (req, res) => {
    try {
      const { userId, cartItemId, quantity } = req.body;
  
      const cart = await Cart.findOneAndUpdate(
        { userId, 'items._id': cartItemId },
        {
          $set: {
            'items.$.quantity': quantity
          }
        },
        { new: true }
      );
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  

  const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const result = await Cart.updateOne(
      { userId },
      { $pull: { items: { productId } } }
    );
    if (result == 1) {
      getCart(req, res); // Call getCart to update the cart after item removal
    } else {
      getCart(req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
  
export  {addToCart,getCart,updateCartQuantity,removeFromCart};
