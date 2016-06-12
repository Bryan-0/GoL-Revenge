'use strict';

class Cell {
	constructor() {
		this.type = 1;
		this.inhabitant;
	}

	makeType(type) {
		this.type = type;
	}

	inhabit(obj) {
		this.inhabitant = obj;
	}

	toString() {
		if (!this.inhabitant) {
			return '|' + ['_', '_', 'R', 'T', 'F'][this.type];
		}
		return '' + this.inhabitant;
	}
}

module.exports = Cell;
