'use strict';

const User = require('./user.js');

class Users {
	constructor() {
		this.userList = new Map();
	}

	has(id) {
		return this.userList.has(id);
	}

	get(id) {
		return this.userList.get(id);
	}

	set(id, user) {
		return this.userList.set(id, user);
	}

	add(socket) {
		let user = new User(socket);
		return this.userList.set(user.id, user);
	}

	remove(id) {
		let user = this.userList.get(id);
		if (user) {
			user.destroy();
		}
		return this.userList.delete(id);
	}
}

module.exports = new Users();
