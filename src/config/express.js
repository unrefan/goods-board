import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import * as env from '../utils/env.js';

const app = express();

app.set('port',  process.env.APP_PORT || 3000);
app.set('host',  process.env.APP_HOST || 'localhost');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.isDevelopment()) {
  app.use(morgan('dev'));
}

if (env.isProduction()) {
  app.use(helmet());
}

export default app;