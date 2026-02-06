// ?? middleware для обробки неіснуючих маршрутів
// ** підключається перед middleware для обробки помилок
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message:
      'This route is still unknown... If you are looking for helvita, try on some other routes',
  });
};
