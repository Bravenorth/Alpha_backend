import express from 'express';
import { signup, login, forgotPassword, resetPassword, getProfile } from '../controllers/authController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/profile', authMiddleware, getProfile);

export default router;
