import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
/*
** Segments — це набір «ключів», які визначають, яку саме частину запиту потрібно перевіряти:
  > Segments.BODY → тіло запиту (req.body);
  > Segments.PARAMS → параметри маршруту (req.params);
  > Segments.QUERY → рядок запиту (req.query);
  > Segments.HEADERS → заголовки (req.headers);
  > Segments.COOKIES → кукі (req.cookies).
**
*/

// ** Кастомний валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

// ** Схема для перевірки параметра studentId
export const studentIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(objectIdValidator).required(),
  }),
};

// Приклад схеми для перевірки тіла запиту
// під час створення нового студента
export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages(studentErrorMessages('name', true)),
    age: Joi.number()
      .integer()
      .min(12)
      .max(65)
      .required()
      .messages(studentErrorMessages('age', true)),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .messages(studentErrorMessages('gender', true)),
    avgMark: Joi.number()
      .min(2)
      .max(12)
      .required()
      .messages(studentErrorMessages('avgMark', true)),
    onDuty: Joi.boolean()
      .required()
      .messages(studentErrorMessages('onDuty', true)),
  }),
};

export const updateStudentSchema = {
  ...studentIdParamSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30).messages(studentErrorMessages('name')),
    age: Joi.number()
      .integer()
      .min(12)
      .max(65)
      .messages(studentErrorMessages('age')),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .messages(studentErrorMessages('gender')),
    avgMark: Joi.number()
      .min(2)
      .max(12)
      .messages(studentErrorMessages('avgMark')),
    onDuty: Joi.boolean().messages(studentErrorMessages('onDuty')),
  }).min(1),
};

function studentErrorMessages(value, valueIsRequired = false) {
  switch (value) {
    case 'name': {
      const defaultMessage = {
        'string.base': 'Name must be a string',
        'string.min': 'Name should have at least {#limit} characters',
        'string.max': 'Name should have at most {#limit} characters',
      };
      const requiredMessage = { 'any.required': 'Name is required' };

      const finalMessage = valueIsRequired
        ? { ...defaultMessage, ...requiredMessage }
        : defaultMessage;

      return finalMessage;
    }
    case 'age': {
      const defaultMessage = {
        'number.base': 'Age must be a number',
        'number.min': 'Age must be at least {#limit}',
        'number.max': 'Age must be at most {#limit}',
      };
      const requiredMessage = { 'any.required': 'Age is required' };

      const finalMessage = valueIsRequired
        ? { ...defaultMessage, ...requiredMessage }
        : defaultMessage;

      return finalMessage;
    }
    case 'gender': {
      const defaultMessage = {
        'any.only': 'Gender must be one of: male, female, or other',
      };
      const requiredMessage = { 'any.required': 'Gender is required' };

      const finalMessage = valueIsRequired
        ? { ...defaultMessage, ...requiredMessage }
        : defaultMessage;

      return finalMessage;
    }
    case 'avgMark': {
      const defaultMessage = {
        'number.base': 'Average mark must be a number',
        'number.min': 'Average mark must be at least {#limit}',
        'number.max': 'Average mark must be at most {#limit}',
      };
      const requiredMessage = { 'any.required': 'Average mark is required' };

      const finalMessage = valueIsRequired
        ? { ...defaultMessage, ...requiredMessage }
        : defaultMessage;

      return finalMessage;
    }
    case 'onDuty': {
      const defaultMessage = {
        'boolean.base': 'onDuty must be a boolean value',
      };
      const requiredMessage = { 'any.required': 'onDuty is required' };

      const finalMessage = valueIsRequired
        ? { ...defaultMessage, ...requiredMessage }
        : defaultMessage;

      return finalMessage;
    }
    default: {
      return {};
    }
  }
}
