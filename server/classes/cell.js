'use strict';

class Cell {
	constructor() {
		this.type = 1;
		this.inhabitant = false;
	}

	makeType(type) {
		this.type = type;
	}

	inhabit(obj) {
		let changeBacteriaNum = !this.inhabitant;
		this.inhabitant = obj;
		return changeBacteriaNum;
	}

	kill() {
		if (this.inhabitant) {
			this.inhabitant = false;
			return true;
		}
		return false;
	}

	isHabitated() {
		return !!this.inhabitant;
	}

	toString() {
		if (!this.inhabitant) {
			return '|' + ['_', '_', 'R', 'T', 'F'][this.type];
		}
		return '' + this.inhabitant;
	}
}

module.exports = Cell;
