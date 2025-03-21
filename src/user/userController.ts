import express, { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import {generateToken} from '../config/jwt'
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const userData = await User.findOne({email})
    if(userData){
        res.status(400).json({ error: 'User already exists' });
        return;
    }
    const user = new User({ name, email, password, role: req.body.role ? req.body.role :'customer' });
    await user.save();
     res.status(201).json({ message: 'User registered successfully' });
     return
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    return
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void>  => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = generateToken({ userId: user._id, role: user.role });
    res.json({ token });
    return
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    return
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req?.user?.userId).select('-password');
        res.json(user);
        return
    }catch (error) {
        res.status(500).json({ error: 'Login failed' });
        return
    }
};