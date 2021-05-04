import jwt from 'jsonwebtoken';

export const generate = user => jwt.sign(user, process.env.APP_KEY);