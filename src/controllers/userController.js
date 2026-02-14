import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
    new: true,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const updateUserAvatar = async (req, res) => {
  const { file } = req;
  if (!file) {
    throw createHttpError(400, 'No file has been loaded');
  }

  const result = await saveFileToCloudinary(req.file.buffer, req.user._id);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  );

  res.status(200).json({ url: user.avatar });
};
