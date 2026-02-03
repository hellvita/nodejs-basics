console.log('\n------ fs async ------\n');

import path from 'node:path';
import { pathToWorkDir, pathParts } from '../module-path.js';
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

// ** асинхронний fs - запис у файл (перезапис файлу)
// якщо файл існує - перезапише його,
// якщо ні - створить новий

// з додаванням дургого аргумента,
// що відповідає за кодування
await fs.writeFile(file2, "\n>>> how it's going, helvita?~☻", 'utf8');
const file2DataAsync = await fs.readFile(file2, 'utf8');
console.log('file2DataAsync: ', file2DataAsync);

// ** асинхронний fs - запис у файл (додавання нової інформації)
// додавання даних в кінець файлу
await fs.appendFile(file2, "\n>>> i hope you're doing well~♥");
const file2DataAsyncUpdated = await fs.readFile(file2, 'utf8');
console.log('file2DataAsyncUpdated: ', file2DataAsyncUpdated);

// ** асинхронний fs - зміна шляху до файлу/перейменування файлу
const folderPath = path.join(pathToWorkDir, 'files');

const oldPath = path.join(folderPath, 'file_2.txt');
const newPath = path.join(folderPath, 'file_3.txt');

const file3 = newPath;

await fs.rename(oldPath, newPath);

console.log('file2:', pathParts(file2));
console.log('file3:', pathParts(file3));

try {
  const file2DataAsyncDeleted = await fs.readFile(file2, 'utf8');
  console.log('file2DataAsyncDeleted: ', file2DataAsyncDeleted);
} catch (error) {
  console.log(`\nerror: ${error}\n`);
}

const file3DataAsync = await fs.readFile(file3, 'utf8');
console.log('file3DataAsync: ', file3DataAsync);
