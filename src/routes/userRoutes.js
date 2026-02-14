import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  updateUserAvatar,
  updateUser,
  getUser,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.patch('/users/me', authenticate, updateUser);

router.get('/users/me', authenticate, getUser);

export default router;
