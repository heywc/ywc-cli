const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve('package.json'), 'utf-8');
console.log(JSON.parse(data).version);