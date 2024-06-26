import express from 'express';
import { signup, login, forgotPassword, resetPassword, getProfile, updateMe } from '../controllers/authController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/profile', authMiddleware, getProfile);
router.patch('/updateMe', authMiddleware, updateMe); // Utilisation de authMiddleware à la place de protect

export default router;
