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

	populateCell(x, y, bacteria) {
		if (!this.board[x]) this.board[x] = [];
		if (!this.board[x][y]) this.board[x][y] = new Cell();
		this.board[x][y].inhabit(bacteria);
	}

	show() {
		let opt = '';
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				opt += '' + this.board[x][y];
			}
		}
		opt += '|';
		console.log(opt);
	}
}

module.exports = Board;
