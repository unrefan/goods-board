import './bootstrap.js';
import app from './config/express.js';
import sessions from './config/sessions.js';
import auth from './services/auth.js';
import * as errors from './middlewares/errors.js';
import routes from './routes/index.js';
import swagger from './config/swagger.js';
import swaggerUI from 'swagger-ui-express';

app.use(sessions);
app.use(auth.initialize({userProperty: 'auth'}));
app.use(auth.session({}));

app.use('/docs/api', swaggerUI.serve, async (req, res, next) => swaggerUI.setup(await swagger)(req, res, next));
app.use('/api', routes);

app.use(errors.validationError);
app.use(errors.multerError);
app.use(errors.internalError);

const server = app.listen(app.get('port'), app.get('host'), () => {
  console.log('express server 🚀 started at %s:%s', app.get('host'), app.get('port'));
});

export default server;