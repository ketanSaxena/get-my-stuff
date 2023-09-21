import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/signup', async (req, res) => {
   const { email, password } = req.body;

   // Check if user exists
   const existingUser = await User.findOne({ email });
   if (existingUser) {
      return res.status(400).send('User already exists');
   }

   // Hash the password and create a new user
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = new User({
      email,
      hashedPassword
   });

   await user.save();

   // Generate JWT and respond
   const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '4h' });
   res.send({ token });
});

router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });
   if (!user) {
      return res.status(400).send('Invalid email or password');
   }

   const validPassword = await bcrypt.compare(password, user.hashedPassword);
   if (!validPassword) {
      return res.status(400).send('Invalid email or password');
   }

   // Generate JWT and respond
   const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
   res.send({ token });
});

export default router;
