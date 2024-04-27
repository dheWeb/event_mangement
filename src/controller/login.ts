import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/User";
import generateToken from "../utils/generateToken";

const router = express.Router();

router.post('/api/login', async (req :Request, res :Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = generateToken(user.id);

    res.status(200).json({ token, id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export { router as loginRouter };