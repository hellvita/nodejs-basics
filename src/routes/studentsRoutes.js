import { Router } from 'express';
import { Student } from '../models/student.js';

const router = Router();

// !! Робота з БД 'students'

// Маршрут: отримати всіх студентів
router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

// Маршрут: отримати одного студента за id
router.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json(student);
});

export default router;
