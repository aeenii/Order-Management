import express from 'express';
const { authenticate, authorizeAdmin } = require('../middlware/authMiddlware');
const { createProduct, updateProduct, listProducts, getProductById } = require('../product/productController');

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, createProduct);
router.put('/:id', authenticate, authorizeAdmin, updateProduct);
router.get('/', authenticate, listProducts);
router.get('/:id',authenticate, getProductById);

export default router;