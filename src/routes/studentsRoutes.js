import { Router } from 'express';
import {
  getStudents,
  getStudentByID,
  createStudent,
  deleteStudent,
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

export default router;
