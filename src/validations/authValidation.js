import { Joi, Segments } from 'celebrate';
import { Schema } from 'mongoose';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(6).required(),
  }),
};

export const loginUserSchema = new Schema({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required(),
  }),
});
