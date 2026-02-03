console.log('\n------ fs sync ------\n');

import path from 'node:path';
import { pathToWorkDir } from '../module-path.js';

// ?? робота з файлами та папками за допомогою модуля node:fs
import fs from 'node:fs';

export const file1 = path.join(pathToWorkDir, 'files', 'file_1.txt');

// ** синхронний fs - читання файлу
// без додавання дургого аргумента,
// що відповідає за кодування
const buffer1 = fs.readFileSync(file1);
console.log('buffer1: ', buffer1);

export const file2 = path.join(pathToWorkDir, 'files', 'file_2.txt');

// з додаванням дургого аргумента,
// що відповідає за кодування
const file1Data = fs.readFileSync(file1, 'utf8');
console.log('file1Data: ', file1Data);

// ** синхронний fs -запис у файл
// якщо файл існує - перезапише його,
// якщо ні - створить новий

// з додаванням дургого аргумента,
// що відповідає за кодування
fs.writeFileSync(file2, "how it's going, helvita?~☻", 'utf8');
const file2Data = fs.readFileSync(file2, 'utf8');
console.log('file2Data: ', file2Data);
