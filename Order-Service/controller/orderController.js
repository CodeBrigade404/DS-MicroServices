import Order from '../model/ordermodel.js';

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create a new order
const createOrder = async (req, res) => {
  const { user, addressId, totalAmount, items, paymentStatus, paymentType } = req.body;

  const newOrder = new Order({
    user,
    addressId,
    totalAmount,
    items,
    paymentStatus,
    paymentType,
  });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getAllOrders, createOrder };
