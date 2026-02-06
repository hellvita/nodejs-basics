export const getLocal = (req, res) => {
  res.status(200).json({ message: 'Hello, helvita!~♥' });
};

export const getLife = (req, res) => {
  res.status(200).json({ message: 'How you been doing, helvita?~☻' });
};

export const getStates = (req, res) => {
  res.status(200).json([
    { id: 1, state: "i'm suuuuper!!!!" },
    { id: 2, state: "i'm fine)" },
  ]);
};

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

export const getStateByID = (req, res) => {
  const { helvitaID } = req.params; // Параметри завжди приходять у вигляді рядків
  const state = getTempState(helvitaID);
  res.status(200).json({ id: helvitaID, ...state });
};

export const getError = (req, res) => {
  const errorDescription =
    'Helooow!! ammm yoll ewol!~~~~ fank u, helvita, for giving me lifuuu!~~♥♥♥';

  throw new Error(errorDescription);
};
