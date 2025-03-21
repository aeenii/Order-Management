import { Request, Response, NextFunction } from 'express';
import {generateToken, verifyToken } from '../config/jwt'
export const authenticate = async (req: any , res: Response, next: NextFunction)  => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid User Data' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const authorizeAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};