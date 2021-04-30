import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import session from 'express-session';
import routes from './routes/index.js';
import {isDevelopment, isProduction} from './utils/env.js';
import SessionStore from '@quixo3/prisma-session-store';
import prisma from './config/database.js';
import passport from 'passport';
import authentication from './services/Auth.js';

const sessionOptions = {
	secret: process.env.APP_KEY,
	cookie: {
	  maxAge: 7 * 24 * 60 * 60 * 1000
	},
	resave: true,
	saveUninitialized: true,
  	store: new SessionStore.PrismaSessionStore(
	  prisma,
	  {
			checkPeriod: false,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
	  }
	),
};
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (isDevelopment()) {
	app.use(morgan('dev'));
}

if (isProduction()) {
	app.set('trust proxy', 1);
	sessionOptions.cookie.secure = true;
	app.use(helmet());
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

routes(app);
authentication(passport);

app.post('/api/login',
	passport.authenticate('local', { successRedirect: '/api/users',
		failureRedirect: '/login',
		failureFlash: true })
);

app.use((err, req, res) => {
	console.error(err.message);
	return res.status(400).json({
		error: err.message,
	});
});

export default app;