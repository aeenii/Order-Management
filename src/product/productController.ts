import { Request, Response } from 'express';
import { Product } from '../models/productModel';

// Create Product (Admin Only)
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;

  try {
    const product = new Product({ name, description, price, stock });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update Product (Admin Only)
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// List Products
export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};