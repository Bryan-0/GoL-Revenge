'use strict';

const Cell = require('./cell.js');
const CellTracker = require('./cell-tracker.js');

class Board {
	constructor() {
		this.board = [];
		this.size = 15;
		this.totalBacteria = 0;
		this.trackedCells = {};
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
		/*for (let coords in this.trackedCells) {
			// surrounded tiene una lista de tipos de bacteria que lo rodean
			// Ordenar la lista de tipos por cantidad
			// Ver el tipo de cantidad
			if (surrounded.type === 'B') {
				// Tiene una bacteria
				// Check muerte sobrepoblación
				// Check muerte soledad
				// Check poblar con una nueva tras check de muertes
			} else {
				// No bacteria
				// Check reproducciones
				// Check nueva bacteria de CPU
			}
		}*/
	}

	getCell(x, y) {
		if (!this.board[x] || !this.board[x][y]) return false;
		return this.board[x][y];
	}

	isHabitated(x, y) {
		let cell = this.getCell(x, y);
		if (!cell) return false;
		return cell.isHabitated();
	}

	populateCell(x, y, bacteria) {
		if (this.board[x][y].inhabit(bacteria)) {
			this.totalBacteria++;
			this.trackCell(x, y, bacteria);
		}
	}

	// Marks a cell and all its neighbours as active for the next step.
	// Abstract this shit pls
	// TODO: Take into account cell types: Toxic, Rock, Fertile.
	trackCell(x, y, bacteria) {
		for (let coords of [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]) {
			this.markCell(x + coords[0], y + coords[1], bacteria);
		}
	}

	markCell(x, y, bacteria) {
		if (x > -1 && y > -1 && x < this.size - 1 && y < this.size - 1) {
			let pos = x + ',' + y;
			if (!this.trackedCells[pos])
				this.trackedCells[pos] = new CellTracker(x, y);
			if (!this.trackedCells[pos].surrounding[bacteria.id])
				this.trackedCells[pos].surrounding[bacteria.id] = {type: bacteria, quantity: 0};
			this.trackedCells[pos].surrounding[bacteria.id].quantity++;
		}
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
