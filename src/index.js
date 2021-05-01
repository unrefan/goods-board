import './bootstrap.js';
import app from './config/express.js';
import sessions from './config/sessions.js';
import auth from './services/auth.js';
import * as errors from './middlewares/errors.js';
import routes from './routes/index.js';

app.use(sessions);
app.use(auth.initialize());
app.use(auth.session());

app.use('/api', routes);

app.use(errors.validationError);
app.use(errors.internalError);

const server = app.listen(app.get('port'), app.get('host'), () => {
  console.log('express server 🚀 started at %s:%s', app.get('host'), app.get('port'));
});

export default server;