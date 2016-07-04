'use strict';

class Cell {
	constructor(type) {
		this.type = type || 1;
		this.inhabitant = false;
		this.neighbours = {topleft: null, above: null, topright: null, below: null, left: null, right: null};
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
