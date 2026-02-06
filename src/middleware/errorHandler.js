import { HttpError } from 'http-errors';

// ?? middleware для обробки помилок
// ** ЗАВЖДИ має чотири аргумента - (err, req, res, next)
// ** підключається після усіх маршрутів
export const errorHandler = (err, req, res, next) => {
  console.log(`Error:\n${err?.message}`);

  if (err?.name === 'CastError') {
    return res
      ?.status(400)
      .json({ message: `Invalid format for ${err?.path}: ${err?.value}` });
  }

  if (err instanceof HttpError) {
    return res?.status(err.status).json({ message: err.message || err.name });
  }

  const isProd = process.env.NODE_ENV === 'production';
  const prodMessage =
    'It seems that something mysterious just happened...and this thing is responsible for interrupting your process! Please, try again.';

  res?.status(500).json({
    message: 'Internal Server Error (small)',
    error: isProd ? prodMessage : err?.message,
  });
};
