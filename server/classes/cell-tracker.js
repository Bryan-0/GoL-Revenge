'use strict';

class CellTracker {
	constructor(x, y, state='empty', cellType='_') {
		this.pos = {x: x, y: y};
		this.state = state;
		this.cellType = cellType;
		this.environment = {
			'R': 0,
			'T': 0,
			'F': 0
		};
		this.surrounding = [];
	}

	orderSurrounding() {
		this.surrounding.sort((itemA, itemB) => {
			if (itemB.quantity > itemA.quantity)
				return -1;

			if (itemA.quantity > itemB.quantity)
				return 1;

			return 0;
		});
	}
}

module.exports = CellTracker;
