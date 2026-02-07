import { Joi, Segments } from 'celebrate';

// Приклад схеми для перевірки тіла запиту
// під час створення нового студента
export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(12).max(65).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    avgMart: Joi.number().min(2).max(12).required(),
    onDuty: Joi.boolean(),
  }),
};
/*
** Segments — це набір «ключів», які визначають, яку саме частину запиту потрібно перевіряти:
  > Segments.BODY → тіло запиту (req.body);
  > Segments.PARAMS → параметри маршруту (req.params);
  > Segments.QUERY → рядок запиту (req.query);
  > Segments.HEADERS → заголовки (req.headers);
  > Segments.COOKIES → кукі (req.cookies).
 */
