import express from 'express';
import { signup, login, forgotPassword, resetPassword, getProfile, updateMe } from '../controllers/authController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';
import { restrictTo } from '../middlewares/roleMiddleware.mjs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/profile', authMiddleware, getProfile);
router.patch('/updateMe', authMiddleware, updateMe);

// Routes protégées par le rôle
router.get('/admin', authMiddleware, restrictTo('admin'), (req, res) => {
  res.status(200).json({ message: 'Admin content' });
});

export default router;
