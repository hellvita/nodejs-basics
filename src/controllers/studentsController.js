import { Student } from '../models/student.js';
import createHttpError from 'http-errors';

export const getStudents = async (req, res) => {
  const { page = 1, perPage = 10 } = await req.query;
  const skip = (page - 1) * perPage;

  const studentsQuery = Student.find();

  const [totalItems, students] = await Promise.all([
    studentsQuery.clone().countDocuments(),
    studentsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, students });
};

export const getStudentByID = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);

  res.status(201).json(student);
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({ _id: studentId });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

export const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndUpdate({ _id: studentId }, req.body, {
    new: true,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};
