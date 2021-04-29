import UserRouter from '../controllers/Users.js';
import HintMiddleware from '../middlewares/HintMiddleware.js';

export default function (app) {
  	app.use('/api/users/:user', HintMiddleware);

	app.use('/api', UserRouter);
}