import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const isEmailInUse = await User.findOne({ email });
  if (isEmailInUse) {
    throw createHttpError(400, 'EmailInUse');
  }

  res.status(201).json({ message: `add user with email ${email}` });
};
