import crypto from 'crypto';
import fs from 'fs';
import dotenv from 'dotenv';
import os from 'os';

function generateKey(size = 22) {
	return crypto
		.randomBytes(size)
		.toString('base64')
		.slice(0, size);
}

const file = './.env';
const envConfig = dotenv.parse(fs.readFileSync(file));

envConfig['APP_KEY'] =  generateKey();

const serialized = Object.entries(envConfig).map(([key, value]) => {
	return key + '=' + value;
}).join(os.EOL);

fs.writeFileSync(file, serialized);

console.log('Generated [%s] and set APP_KEY', envConfig['APP_KEY']);
