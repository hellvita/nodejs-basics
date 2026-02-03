// ?? автоматичне створення шляхів за допомогою модуля node:path
import path from 'node:path';

const pathExample = path.join('folder-1', 'file_4.txt');
console.log('pathExample: ', pathExample);

const pathToWorkDir = path.join(process.cwd());
const pathToFile = path.join(pathToWorkDir, 'src', 'index.js');
console.log('pathToFile: ', pathToFile);

const pathParts = path.parse(pathToFile);
console.log('pathParts: ', pathParts);

// ?? робота з файлами та папками за допомогою модуля node:fs
// ** синхронний fs
import fs from 'node:fs';

const file1 = path.join(pathToWorkDir, 'files', 'file_1.txt');

// без кодування дургого аргумента,
// що відповідає за кодування
const buffer1 = fs.readFileSync(file1);
console.log('buffer1: ', buffer1);

// з кодуванням дургого аргумента,
// що відповідає за кодування
const file1Data = fs.readFileSync(file1, 'utf8');
console.log('file1Data: ', file1Data);

// ** асинхронний fs
import fs from 'node:fs/promises';

// без кодування дургого аргумента,
// що відповідає за кодування
const buffer1Async = await fs.readFile(file1);
console.log('buffer1Async: ', buffer1Async);

// з кодуванням дургого аргумента,
// що відповідає за кодування
const file1DataAsync = await fs.readFile(file1, 'utf8');
console.log('file1DataAsync: ', file1DataAsync);
