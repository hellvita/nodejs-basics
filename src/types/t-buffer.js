console.log('\n------ type buffer ------\n');

import fs from 'node:fs/promises';

import { file1 } from '../modules/module-fs/module-fs-sync.js';

// ?? Buffer - це спеціальний тип даних у Node.js, призначений для роботи з двійковими даними
// Біт — це найменша одиниця інформації: 0 або 1
// Байт — це 8 бітів (у) такій комбінації можна представити 256 різних значень)

const buffer = await fs.readFile(file1);

console.log(`\ntypeof buffer: ${typeof buffer}\n`);
console.log('buffer: ', buffer);

const bufferStr = buffer.toString('utf8');

console.log(`\nbufferStr: ${bufferStr}\n`);

// ** Якщо при читанні файлу одразу вказати кодування ("utf8"),
// ** результатом буде рядок, а не Buffer.
// ** Якщо кодування не вказано — повертається Buffer.
