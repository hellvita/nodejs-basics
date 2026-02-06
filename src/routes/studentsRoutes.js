import { Router } from 'express';
import {
  getStudents,
  getStudentByID,
} from '../controllers/studentsController.js';

const router = Router();

// !! Робота з БД 'students'

// Маршрут: отримати всіх студентів
router.get('/students', getStudents);

// Маршрут: отримати одного студента за id
router.get('/students/:studentId', getStudentByID);

export default router;
