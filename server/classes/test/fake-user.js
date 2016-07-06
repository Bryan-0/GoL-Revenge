'use strict';

const FakeSocket = require('./fake-socket.js');

class FakeUser {
	constructor() {
		this.socket = new FakeSocket();
		this.socket.user = this;
		this.guestNum = -1;
		this.name = 'CPU user';
		this.generateId();
		this.ips = ['0.0.0.0'];
		this.currentIp = '0.0.0.0';
		this.bacteriaPrototype = {owner: this};
		this.defaultProto();
	}

	defaultProto() {
		this.bacteriaPrototype.genetics = this.bacteriaPrototype.genetics || {fertility: 3, solitude: 1, overpopulation: 4, color: '#000'};
		this.bacteriaPrototype.pattern = this.bacteriaPrototype.pattern || [{x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}];
	}

	generateId() {
		let text = '' + this.name;
		this.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '');
	}

	usePrototype(proto = {}) {
		proto.owner = this;
		this.bacteriaPrototype = proto;
		this.defaultProto();
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

module.exports = FakeUser;
