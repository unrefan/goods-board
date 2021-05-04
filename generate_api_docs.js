import swagger from './src/config/swagger.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

swagger.then(json => {
  fs.writeFileSync('public/swagger.json', JSON.stringify(json));
})
  .catch(e => new Error(e));

console.log('swagger.json successfully generated at public folder');
