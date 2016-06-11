'use strict';

class User {
	constructor(socket) {
		this.socket = socket;
		socket.user = this;
		this.guestNum = User.guestNumGenerator.next().value;
		this.name = 'Guest ' + this.guestNum;
		this.generateId();
		this.ips = [socket.remoteAddress];
		this.currentIp = socket.remoteAddress;
		this.bacteriaPrototype = {};
	}

	generateId() {
		let text = '' + this.name;
		this.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '');
	}

	usePrototype(proto) {
		this.bacteriaPrototype = proto;
	}

	send(message) {
		if (!message || !this.socket) return;
		return this.socket.write(message);
	}

	destroy() {
		delete this.socket.user;
		this.socket.close();
		delete this.socket;
	}
}

// TODO: ¿Una manera que no requiera de un generador en un static, sin requerir de dependencias externas?
User.guestNumGenerator = (function* () {
	let guestNum = 0;
	while (true) {
		let reset = yield ++guestNum;
		if (reset) guestNum = 0;
	}
})();

module.exports = User;
