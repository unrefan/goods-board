import './bootstrap.js';
import app from './server.js';

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
	console.log('express server 🚀 started on port: ' + port);
});

export default server;