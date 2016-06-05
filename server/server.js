'use strict';

const http = require('http');
const sockjs = require('sockjs');
const Parser =require('./parser.js');

let socketServer = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'});
socketServer.on('connection', socket => {
	Users.add(socket);

	socket.on('data', message => {
		if (Buffer(message).length > 10000) {
			socket.close();
		} else {
			Parser.parse(message, socket.user);
		}
	});

	socket.on('close', () => {
		if (socket.user) {
			Users.remove(socket.user.id);
		}
	});
});

const server = http.createServer();
socketServer.installHandlers(server, {prefix: '/gol'});
server.listen(9001, '0.0.0.0');
