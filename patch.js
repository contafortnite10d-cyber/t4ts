const fs = require('fs');
let code = fs.readFileSync('src/app/layouts/AppLayout.tsx', 'utf8');
code = code.replace(
  /(\<div className=\{cn\([\s\S]*?"px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",[\s\S]*?isCollapsed && "lg:hidden"[\s\S]*?\)\}\>[\s\S]*?\{group\.title\}[\s\S]*?\<\/div\>)/g,
  "{group.title && ($1)}"
);
fs.writeFileSync('src/app/layouts/AppLayout.tsx', code);
