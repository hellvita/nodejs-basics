import express from 'express';

const app = express();
const PORT = 3000;

// ** req (request) — об'єкт запиту. Містить інформацію про сам HTTP-запит: шлях, параметри, тіло, заголовки.
// ** res (response) — об'єкт відповіді. Використовується для формування і відправки відповіді клієнту.

// run GET query in Postman on route 'http://localhost:3000'
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, helvita!~♥' });
});

// run GET query in Postman on route 'http://localhost:3000/life'
app.get('/life', (req, res) => {
  res.status(200).json({ message: 'How you been doing, helvita?~☻' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
