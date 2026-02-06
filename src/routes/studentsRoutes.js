import { Router } from 'express';
import {
  getStudents,
  getStudentByID,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentsController.js';

const router = Router();

// !! Робота з БД 'students'

// Маршрут: отримати всіх студентів
router.get('/students', getStudents);

// Маршрут: отримати одного студента за id
router.get('/students/:studentId', getStudentByID);

// Маршрут: створення нового студента
router.post('/students', createStudent);

// Маршрут: видалити одного студента за id
router.delete('/students/:studentId', deleteStudent);

// Маршрут: оновити дані про одного студента за id
router.patch('/students/:studentId', updateStudent);

export default router;
