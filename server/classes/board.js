'use strict';

const Cell = require('./cell.js');

class Board {
	constructor(id) {
		this.id = id;
		this.board = [];
		this.size = 15;
	}

	createCells() {
		for (let x = 0; x < this.size; x++) {
			if (!this.board[x]) this.board[x] = [];
			for (let y = 0; y < this.size; y++) {
				this.board[x][y] = new Cell();
			}
		}
	}

	getRandomType(entropy) {
		entropy = entropy || 21;
		let dice = Math.random() * 100;
		if (dice < entropy / 3)
			return 2;

		if (dice < entropy / 3 * 2)
			return 3;

		if (dice < entropy)
			return 4;

		return 1;
	}

	populateCell(x, y, bacteria) {
		this.board[x][y].inhabit(bacteria);
	}

	isHabitated(x, y) {
		return this.board[x][y].isHabitated();
	}

	show() {
		let opt = '';
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				opt += '' + this.board[x][y];
			}
			opt += '|\n';
		}
		console.log(opt);
	}
}

module.exports = Board;
