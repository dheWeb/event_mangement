import express from 'express';
import { User } from '../model/User';
import bcrypt from "bcryptjs";
import generateToken from '../utils/generateToken';
const router = express.Router();

router.post('/api/signup', async (req, res) => {
    try {
        
        const { email, password, name } = req.body;
        
     
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = User.create({ email, password: hashedPassword, name });
        const savedUser = await User.save(newUser);
    
        const token = generateToken(savedUser.id);
    
        res.status(201).json({ token, userId: savedUser.id, email, name });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
});

export { router as signupRouter };