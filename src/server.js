import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

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
app.use(express.json());

// ?? дозволяє запити з будь-яких джерел
// у більш складних випадках можна задавати конкретні домени чи методи
app.use(cors());

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

// run GET query in Postman on route 'http://localhost:3000'
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, helvita!~♥' });
});

// run GET query in Postman on route 'http://localhost:3000/life'
app.get('/life', (req, res) => {
  res.status(200).json({ message: 'How you been doing, helvita?~☻' });
});

// список усіх станів ('http://localhost:3000/helvita/states')
app.get('/helvita/states', (req, res) => {
  res.status(200).json([
    { id: 1, state: "i'm suuuuper!!!!" },
    { id: 2, state: "i'm fine)" },
  ]);
});

const getTempState = (id) => {
  const numID = Number(id);
  if (numID === 1) {
    return { state: "i'm suuuuper!!!!" };
  } else if (numID === 2) {
    return { state: "i'm fine)" };
  } else
    return {
      state: `i'm still fine, though there is no such an id as '${numID}'...`,
    };
};

// конкретний стан за id ('http://localhost:3000/helvita/states/1')
app.get('/helvita/states/:helvitaID', (req, res) => {
  const { helvitaID } = req.params; // Параметри завжди приходять у вигляді рядків
  const state = getTempState(helvitaID);
  res.status(200).json({ id: helvitaID, ...state });
});

// запит, що викликає помилку
app.get('/maybe-error', (req, res) => {
  const errorDescription =
    'Helooow!! ammm yoll ewol!~~~~ fank u, helvita, for giving me lifuuu!~~♥♥♥';

  throw new Error(errorDescription);
});

// !! Робота з БД 'students'
app.use(studentsRoutes);

// ?? middleware для обробки неіснуючих маршрутів
// ** підключається перед middleware для обробки помилок
app.use(notFoundHandler);

// ?? middleware для обробки помилок
// ** ЗАВЖДИ має чотири аргумента - (err, req, res, next)
// ** підключається після усіх маршрутів
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
