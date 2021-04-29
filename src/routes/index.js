import UserRouter from '../controllers/Users.js';

export default function (app) {
	app.use('/api', UserRouter);
}