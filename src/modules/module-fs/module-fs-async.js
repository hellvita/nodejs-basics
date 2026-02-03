console.log('\n------ fs async ------\n');

import { file1, file2 } from './module-fs-sync.js';

// ?? робота з файлами та папками за допомогою модуля node:fs
import fs from 'node:fs/promises';

// ** асинхронний fs - читання файлу
// без додавання дургого аргумента,
// що відповідає за кодування
const buffer1Async = await fs.readFile(file1);
console.log('buffer1Async: ', buffer1Async);

// з додаванням дургого аргумента,
// що відповідає за кодування
const file1DataAsync = await fs.readFile(file1, 'utf8');
console.log('file1DataAsync: ', file1DataAsync);

// ** асинхронний fs -запис у файл
// якщо файл існує - перезапише його,
// якщо ні - створить новий

// з додаванням дургого аргумента,
// що відповідає за кодування
await fs.writeFile(file2, "how it's going, helvita?~☻", 'utf8');
const file2DataAsync = await fs.readFile(file2, 'utf8');
console.log('file2DataAsync: ', file2DataAsync);
