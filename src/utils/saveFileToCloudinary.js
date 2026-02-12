import { Readable } from 'node:stream';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const saveFileToCloudinary = async (buffer, userId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'nodejs-basics/avatars',
        resource_type: 'image',
        public_id: `avatar_${userId}`,
        overwrite: true,
        unique_filename: false,
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

/*
?? Оператор .pipe() з'єднує читальний потік (Readable) із записувальним (Writable).

Відтепер дані автоматично передаються:
* Readable (з buffer) → Writable (у Cloudinary)

Це аналог «трубки», через яку інформація перетікає з одного потоку в інший.
Cloudinary не може напряму прийняти buffer, бо він очікує стрім байтів, а не готовий файл.

Потоки (Readable → Writable) дають змогу:
*- передавати дані без створення тимчасових файлів на диску;
*- обробляти великі файли поступово;
*- відправляти зображення прямо з пам'яті у хмару.
*/
