const DEVELOPMENT = 'development'; 
const PRODUCTION = 'production';

export function isDevelopment() {
	return process.env.NODE_ENV === DEVELOPMENT;
}

export function isProduction() {
  	return process.env.NODE_ENV === DEVELOPMENT;
}

export const ENV = {
	DEVELOPMENT: DEVELOPMENT,
  	PRODUCTION: PRODUCTION,
};