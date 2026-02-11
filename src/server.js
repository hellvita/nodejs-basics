import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import helvitaRoutes from './routes/helvitaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// ?? сучасний логер pino-http: дуже швидкий і простий у налаштуванні
// ** use: npm install pino-http pino-pretty
// допомагає відслідковувати, як працює застосунок:
// які запити надходять, які відповіді повертаються і скільки часу займає обробка
// !! логер треба підключати одним із перших middleware, щоб він бачив усі запити та помилки
app.use(logger);

// ?? middleware для парсингу JSON
// якщо відправити POST-запит із JSON-тілом, сервер автоматично
// розпарсить його і збереже у req.body як JavaScript-об'єкт
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
  }),
);

// ?? дозволяє запити з будь-яких джерел
// у більш складних випадках можна задавати конкретні домени чи методи
app.use(cors());

// ?? парсер для cookie
app.use(cookieParser());

// ** req (request) — об'єкт запиту. Містить інформацію про сам HTTP-запит: шлях, параметри, тіло, заголовки.
// ** res (response) — об'єкт відповіді. Використовується для формування і відправки відповіді клієнту.
// ** next — функція, яка передає обробку далі.

// ?? додавання middleware (проміжні обробки даних/логування/валідація тощо)
// app.use(middleware);          // для всіх маршрутів
// app.use('/path', middleware); // тільки для /path/*

// логування точного часу коли виконується один із запитів
app.use((req, res, next) => {
  const requestTime = new Date().toLocaleString();
  console.log(`new request has been executed at ${requestTime}`);
  next();
});

// ♥♥ Навчальні запити
app.use(helvitaRoutes);

// !! Робота з БД 'students'
app.use(authRoutes); // колекція users
app.use(studentsRoutes); // колекція students
app.use(userRoutes); // колекція users

// ?? middleware для обробки неіснуючих маршрутів
// ** підключається перед middleware для обробки помилок
app.use(notFoundHandler);

// ?? middleware для обробки помилок під час валідації
app.use(errors());

// ?? middleware для обробки помилок
// ** ЗАВЖДИ має чотири аргумента - (err, req, res, next)
// ** підключається після усіх маршрутів
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
