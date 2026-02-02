// автоматичне створення шляхів за допомогою модуля node:path
import path from 'node:path';

const pathExample = path.join('folder-1', 'file_4.txt');
console.log('pathExample: ', pathExample);

const pathToWorkDir = path.join(process.cwd());
const pathToFile = path.join(pathToWorkDir, 'src', 'index.js');
console.log('pathToFile: ', pathToFile);

const pathParts = path.parse(pathToFile);
console.log("pathParts: ", pathParts);
