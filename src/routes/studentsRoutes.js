import { Router } from 'express';
import {
  getStudents,
  getStudentByID,
  createStudent,
} from '../controllers/studentsController.js';

const router = Router();

// !! Робота з БД 'students'

// Маршрут: отримати всіх студентів
router.get('/students', getStudents);

// Маршрут: отримати одного студента за id
router.get('/students/:studentId', getStudentByID);

// Маршрут: створення нового студента
router.post('/students', createStudent);

export default router;
