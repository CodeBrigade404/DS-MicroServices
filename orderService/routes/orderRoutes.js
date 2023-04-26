import express from 'express';
import { getAllOrders, createOrder } from '../controller/orderController.js';

const router = express.Router();

// get all orders
router.get('/', getAllOrders);

// create a new order
router.post('/', createOrder);

export default router; 
