import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const isEmailInUse = await User.findOne({ email });
  if (isEmailInUse) {
    throw createHttpError(400, 'EmailInUse');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid email or password');
  }

  res.status(200).json(user);
};
