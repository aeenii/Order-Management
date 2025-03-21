import express from 'express';
const { createOrder, updateOrderStatus, getOrders } = require('../order/orderController');
const { authenticate, authorizeAdmin } = require('../middlware/authMiddlware');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.put('/:id/status', authenticate, authorizeAdmin, updateOrderStatus);
router.get('/', authenticate, getOrders);

export default router;