console.log('\n------ path ------\n');

// ?? автоматичне створення шляхів за допомогою модуля node:path
import path from 'node:path';

const pathExample = path.join('folder-1', 'file_4.txt');
console.log('pathExample: ', pathExample);

export const pathToWorkDir = path.join(process.cwd());
const pathToFile = path.join(pathToWorkDir, 'src', 'index.js');
console.log('pathToFile: ', pathToFile);

export const pathParts = (pathToFile) => path.parse(pathToFile);
console.log('pathParts: ', pathParts(pathToFile));
