'use strict';

class FakeSocket {
	constructor() {
		this.user = {};
		this.closed = false;
		this.remoteAddress = '0.0.0.0';
	}

	write(str) {
		if (this.closed) {
			console.log('Attempted to write in closed socket!!')
			return;
		}
		console.log('Written in socket: ', str);
	}

	close() {
		this.closed = true;
	}
}

module.exports = FakeSocket;
