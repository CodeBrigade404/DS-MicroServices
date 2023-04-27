import Order from '../model/ordermodel.js';

// get all orders
const getOrdersItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    const items = orders[0].items;
     res.json(items);
     
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    
     res.json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOrdersStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    const items = orders[0].orderStatus[0];
     res.json(items);
     
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// const getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const cartItems = await Cart.find({ userId });
//     const items = cartItems[0].items;
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// };

// create a new order
const createOrder = async (req, res) => {
  const { userId, addressId, totalAmount, items, paymentStatus, paymentType, orderStatus } = req.body;

  const newOrder = new Order({
    userId,
    addressId,
    totalAmount,
    items,
    paymentStatus,
    paymentType,
    orderStatus,
  });

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getOrders, createOrder ,getOrdersItems,getOrdersStatus };
