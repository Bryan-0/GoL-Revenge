const http = require('http');
const sockjs = require('sockjs');

let server = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'});
server.on('connection', (conn) => {
	conn.on('data', (message) => {
		console.log(message);
	});
	conn.on('close', function() {});
});

const server = http.createServer();
server.installHandlers(server, {prefix: '/spellchess'});
server.listen(9001, '0.0.0.0');
