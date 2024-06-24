// middlewares/validation.mjs
import validator from 'validator';

const validateSignup = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric' });
  }
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  next();
};

export default validateSignup;
