import { sign } from 'jsonwebtoken';

const generateToken = (userId : number): string =>
 {
  return sign({ userId }, process.env.JWT_SECRET || "tudu", { expiresIn: '7d' });
};

export default generateToken;
