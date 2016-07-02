'use strict';

const Cell = require('./cell.js');

class Board {
	constructor() {
		this.board = [];
		this.size = 15;
		this.totalBacteria = 0;
		this.trackCells = new Map();
	}

	createOwnCells() {
		this.createCells(this.board, this.size);
	}

	createCells(board, size) {
		for (let x = 0; x < size; x++) {
			if (!board[x]) board[x] = [];
			for (let y = 0; y < size; y++) {
				board[x][y] = new Cell();
				board[x][y].makeType(this.getRandomType());
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

	nextState() {
		// 1. Si está rodeada de células del mismo tipo con una fertilidad adecuada y está vacía, se crea una célula
		// 2. Si está rodeada de células del mismo tipo y el número es de equidad, se mantiene.
		// 3. ...si el número es de morir, pos muerto.
		// 4. Si hay células distintas, hay que contabilizar las reglas por todas ellas.
		// 5. Si hay célulsa distintas fértiles, hay que hacer una mezcla que coja la mejor genética.
		let newBoard = [];
		this.createCells(newBoard, this.size);
		for (let surrounded of this.trackCells) {

		}
	}

	populateCell(x, y, bacteria) {
		if (this.board[x][y].inhabit(bacteria)) {
			this.totalBacteria++;
			this.addCellTrack(x, y, bacteria);
		}
	}

	addCellTrack(x, y, bacteria) {
		this.markCoordinates(x, y);

	}

	markCoordinates(x, y) {
		if (!this.trackCells.has(x + ',' + y))
			this.trackCells.set(x + ',' + y, {
				value: '',
				surroundings: {}
			});
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
