import express from 'express';
import { registerUser, loginUser, getProfile } from '../user/userController';
const { authenticate } = require('../middlware/authMiddlware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getProfile);

export default router;