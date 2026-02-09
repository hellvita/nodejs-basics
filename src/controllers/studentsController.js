import { Student } from '../models/student.js';
import createHttpError from 'http-errors';

// ** Основні оператори в mongoose:
// ♥ Рівність ($eq)
// ♥ Нерівність ($ne)
// ♥ Більше ($gt)
// ♥ Більше або дорівнює ($gte)
// ♥ Менше ($lt)
// ♥ Менше або дорівнює ($lte)
// ♥ У межах списку ($in)
// ♥ Не у списку ($nin)

// ** Приклад:
/**
 * ?? await Student.find()
 * ??   .where('age').gte(6).lte(10)   // вік від 6 до 10 включно
 * ??   .where('avgMark').gt(7)        // середній бал більше 7
 * ??   .exec();                       // виконати зібраний запит
 **/

export const getStudents = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    gender,
    minAvgMark,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = await req.query;
  const skip = (page - 1) * perPage;

  const studentsQuery = Student.find({ userId: req.user._id });

  if (search) {
    studentsQuery.where({ $text: { $search: search } });
  }
  if (gender) {
    studentsQuery.where('gender').equals(gender);
  }
  if (minAvgMark) {
    studentsQuery.where('avgMark').gte(minAvgMark);
  }

  const [totalItems, students] = await Promise.all([
    studentsQuery.clone().countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, students });
};

export const getStudentByID = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOne({
    _id: studentId,
    userId: req.user._id,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  const student = await Student.create({ ...req.body, userId: req.user._id });

  res.status(201).json(student);
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({
    _id: studentId,
    userId: req.user._id,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

export const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndUpdate(
    { _id: studentId, userId: req.user._id },
    req.body,
    {
      new: true,
    },
  );

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};
