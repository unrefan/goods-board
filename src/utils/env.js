const DEVELOPMENT = 'development'; 

export function isDevelopment() {
	return process.env.NODE_ENV === DEVELOPMENT;
} 

export const ENV = {
	DEVELOPMENT: DEVELOPMENT,
};