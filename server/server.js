'use strict';

const http = require('http');
const sockjs = require('sockjs');
const Parser =require('./classes/parser.js');

let socketServer = sockjs.createServer({sockjs_url: Config.sockjsUrl});
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
socketServer.installHandlers(server, {prefix: Config.prefix});
server.listen(Config.port, Config.ip);
