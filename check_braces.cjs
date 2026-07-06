const fs = require('fs');
const code = fs.readFileSync('src/app/layouts/AppLayout.tsx', 'utf8');
let openCount = 0;
for (let i = 0; i < code.length; i++) {
  if (code[i] === '{') openCount++;
  if (code[i] === '}') openCount--;
}
console.log('Braces balance:', openCount);

let openParen = 0;
for (let i = 0; i < code.length; i++) {
  if (code[i] === '(') openParen++;
  if (code[i] === ')') openParen--;
}
console.log('Parentheses balance:', openParen);

let openTag = 0;
for (let i = 0; i < code.length; i++) {
  if (code[i] === '<') openTag++;
  if (code[i] === '>') openTag--;
}
console.log('Tags balance:', openTag);
