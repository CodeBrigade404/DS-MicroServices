import express from 'express';
import { getOrders, createOrder ,getOrdersItems,getOrdersStatus } from '../controller/orderController.js';
 

const router = express.Router();

// get all orders
router.get('/:userId', getOrdersItems);
router.get('/orders/:userId', getOrders);
router.get('/orderstatus/:userId', getOrdersStatus);


// create a new order
router.post('/', createOrder);

export default router; 