'use strict';

class Board {
	constructor(id, horizontalDim, verticalDim) {
		this.id = id;
		this.horizontalDim = horizontalDim;
		this.verticalDim = verticalDim;
		this.board = [];
		for (let x = 0; x < horizontalDim; x++) {
			for (let y = 0; y < verticalDim; y++) {
				this.board[x][y] = new Cell(x, y, getRandomType());
			}
		}
	}

	getRandomType() {
		let dice = Math.random() * 100;
		if (dice < 7)
			return 2;

		if (dice < 14)
			return 3;

		if (dice < 21)
			return 4;

		return 1;
	}
}

module.exports = Board;
