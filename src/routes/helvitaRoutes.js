import { Router } from 'express';

const router = Router();

// run GET query in Postman on route 'http://localhost:3000'
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, helvita!~♥' });
});

// run GET query in Postman on route 'http://localhost:3000/life'
router.get('/life', (req, res) => {
  res.status(200).json({ message: 'How you been doing, helvita?~☻' });
});

// список усіх станів ('http://localhost:3000/helvita/states')
router.get('/helvita/states', (req, res) => {
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
router.get('/helvita/states/:helvitaID', (req, res) => {
  const { helvitaID } = req.params; // Параметри завжди приходять у вигляді рядків
  const state = getTempState(helvitaID);
  res.status(200).json({ id: helvitaID, ...state });
});

// запит, що викликає помилку
router.get('/maybe-error', (req, res) => {
  const errorDescription =
    'Helooow!! ammm yoll ewol!~~~~ fank u, helvita, for giving me lifuuu!~~♥♥♥';

  throw new Error(errorDescription);
});

export default router;
