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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
