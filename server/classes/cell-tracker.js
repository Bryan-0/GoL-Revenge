'use strict';

class CellTracker {
	constructor(x, y, cellType='_', state='empty') {
		this.pos = {x: x, y: y};
		this.state = state;
		this.cellType = cellType;
		this.environment = {
			'R': 0,
			'T': 0,
			'F': 0
		};
		this.surrounding = {};
	}

	hasBacteria() {
		return this.state === 'bacteria';
	}
}

module.exports = CellTracker;
