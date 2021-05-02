import Session from 'express-session';
import SessionStore from '@quixo3/prisma-session-store';
import prisma from './database.js';
import {isDevelopment, isProduction} from '../utils/env.js';

const sessionOptions = {
  secret: process.env.APP_KEY,
  cookie: {
    maxAge: Number(process.env.SESSION_LIFETIME || 120) * 60 * 1000,
    secure: isProduction(),
    httpOnly: isDevelopment(),
  },
  resave: true,
  saveUninitialized: true,
  rolling: true,
  store: new SessionStore.PrismaSessionStore(
    prisma,
    {
	  checkPeriod: 2 * 60 * 1000,
    }
  ),
};

export default Session(sessionOptions);