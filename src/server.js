import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

app.get('/ping', (req, res) => {
	res.send('pong');
});

app.use((err, req, res) => {
	console.error(err.message, err);
	return res.status(400).json({
		error: err.message,
	});
});

export default app;