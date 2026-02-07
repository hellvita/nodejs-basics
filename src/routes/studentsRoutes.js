import { Router } from 'express';
import {
  getStudents,
  getStudentByID,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentsController.js';

// ?? celebrate — це middleware для Express,
// ?? який обгортає Joi та спрощує валідацію в маршрутах

// ** celebrate виконує описану валідацію ДО контролера
// ** Якщо дані валідні — запит переходить далі у контролер
// ** Якщо ні — автоматично повертається помилка 400 Bad Request з поясненням, що саме не відповідає правилам
import { celebrate } from 'celebrate';
import {
  createStudentSchema,
  studentIdParamSchema,
  updateStudentSchema,
  getStudentsSchema,
} from '../validations/studentsValidation.js';

const router = Router();

// !! Робота з БД 'students'

// Маршрут: отримати всіх студентів
router.get(
  '/students',
  celebrate(getStudentsSchema),
  getStudents,
);

// Маршрут: отримати одного студента за id
// ** У Express маршрут може мати кілька проміжних функцій (middleware),
// ** що виконуються у вказаному порядку
router.get(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  getStudentByID,
);

// Маршрут: створення нового студента
router.post('/students', celebrate(createStudentSchema), createStudent);

// Маршрут: видалити одного студента за id
router.delete(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  deleteStudent,
);

// Маршрут: оновити дані про одного студента за id
router.patch(
  '/students/:studentId',
  celebrate(updateStudentSchema),
  updateStudent,
);

export default router;
