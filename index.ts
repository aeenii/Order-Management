import express from 'express';
import connectDB from './src/config/dbConnect';
import userRoutes from './src/user/userRoute';
import productRoutes from './src/product/productRoutes';
import orderRoutes from './src/order/orderRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});