import { Request, Response } from 'express';
import { Order } from '../models/orderModel';
import { Product } from '../models/productModel';
import { User } from '../models/userModel';

export const createOrder = async (req: any, res: Response) => {
  try {
    const { products } = req.body;
    const userId = req.user.userId;
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product: ${product.name}` });
      }
      totalAmount += product.price * item.quantity;
    }

    // Create the order
    const order = new Order({
      userId,
      products,
      totalAmount,
      status: 'pending',
    });
    await order.save();

    // Decrease product stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Order.updateOne({_id : id},{$set:{ status }})
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

// Get Orders
export const getOrders = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;
    let orders;
    if (role === 'admin') {
      orders = await Order.find().populate('userId', 'name email');
    } else {
      orders = await Order.find({ userId }).populate('userId', 'name email');
    }

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};