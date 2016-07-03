'use strict';

const FakeSocket = require('./fake-socket.js');
const User = require('../user.js');

class FakeUser extends User {
	constructor(socket) {
		this.socket = new FakeSocket();
		socket.user = this;
		this.guestNum = -1;
		this.name = 'Fake user';
		this.generateId();
		this.ips = ['0.0.0.0'];
		this.currentIp = '0.0.0.0';
		this.bacteriaPrototype = {owner: this};
		this.defaultProto();
	}
}

module.exports = FakeUser;
