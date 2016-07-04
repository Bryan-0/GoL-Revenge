'use strict';

const Bacteria = require('./bacteria.js');
const Cell = require('./cell.js');
const CellTracker = require('./cell-tracker.js');
const FakeUser = require('./test/fake-user.js');

class Board {
	constructor() {
		this.board = [];
		this.size = 15;
		this.totalBacteria = 0;
		this.trackedCells = {};
	}

	// Creates the cells for its own board array instance.
	// Used on initialisation. The createCells function is used for next state board arrays.
	createOwnCells() {
		this.createCells(this.board, this.size);
	}

	createCells(board, size) {
		for (let x = 0; x < size; x++) {
			if (!board[x]) board[x] = [];
			for (let y = 0; y < size; y++) {
				board[x][y] = new Cell(this.getRandomType());
			}
		}
	}

	// FIXME: Should probably not be part of this class.
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
		// Prepare the new board, which will take place on the curreny array.
		let newBoard = [];
		this.createCells(newBoard, this.size);
		// TODO: Create new tracked cells object.
		let newTrackedCells = {};

		// Check each tracked cell and its state to calculate the next state for each position.
		for (let theCoords in this.trackedCells) {
			let trackedState = this.trackedCells[theCoords];

			if (trackedState.hasBacteria()) {
				// The cell has a Bacteria living on it.
				// Check muerte sobrepoblación
				// Check muerte soledad
				// Check poblar con una nueva tras check de muertes
				let bacteria = this.getCell(trackedState.pos.x, trackedState.pos.y).inhabitant;
				if (trackedState.surrounding[bacteria.id]) {
					if (trackedState.surrounding[bacteria.id].quantity < bacteria.overpopulation && trackedState.surrounding[bacteria.id].quantity > bacteria.solitude) {
						// It does not die, we assign it and continue calculating.
						newBoard[trackedState.pos.x][trackedState.pos.y].inhabit(bacteria);
						continue;
					}
				}

				// Empty cell, check if a reproduction rule applies.
				let reproducers = [];
				for (let sur in trackedState.surrounding) {
					if (trackedState.surrounding[sur].quantity === trackedState.surrounding[sur].type.fertility)
						reproducers.push(trackedState.surrounding[sur].type);
					// TODO: Add here toxic and fertility celltype checks for extra reproduction/death.
					// Rule of thumb: fertility=toxic no effect, f>t it's f, f<t it's t.
				}
				if (reproducers.length === 1) {
					newBoard[trackedState.pos.x][trackedState.pos.y].inhabit(reproducers[0]);
				}
				// Several reproduction rules apply. Make new Bacteria.
				if (reproducers.length > 1) {
					// We'll get the best genetics.
					let proto =  {genetics: {fertility: 10, solitude: -1, overpopulation: 10, color: 0}};
					for (let rep of reproducers) {
						if (rep.fertility < proto.fertility)
							proto.fertility = rep.fertility;
						if (rep.overpopulation > proto.overpopulation)
							proto.overpopulation = rep.overpopulation;
						if (rep.solitude < proto.solitude)
							proto.solitude = rep.solitude;
						proto.color += parseInt('0x' + rep.color, 16) / 2;
					}
					if (proto.solitude >= proto.fertility)
						proto.solitude = proto.fertility - 1;
					// Colour is calculated with integers, but it is transformed into an hex in the end to be used directly.
					proto.color = proto.color.toString(16);
					newBoard[trackedState.pos.x][trackedState.pos.y].inhabit(new Bacteria(new FakeUser(), proto));
				}
			}
		}
		this.board = newBoard;
	}

	// Gets the cell from the active instance board.
	getCell(x, y) {
		return this.getCellFromBoard(this.board, x, y);
	}

	getCellFromBoard(board, x, y) {
		if (!board[x] || !board[x][y]) return false;
		return board[x][y];
	}

	isHabitated(x, y) {
		let cell = this.getCell(x, y);
		if (!cell) return false;
		return cell.isHabitated();
	}

	populateCell(x, y, bacteria) {
		let cell = this.getCell(x, y);
		if (cell && cell.inhabit(bacteria)) {
			this.totalBacteria++;
			this.trackCell(x, y, bacteria);
		}
	}

	// Marks a cell and all its neighbours as active for the next step.
	// TODO: Take into account cell types: Toxic, Rock, Fertile.
	trackCell(x, y, bacteria) {
		this.markCell(x, y);
		this.trackedCells[x + ',' + y].state = 'bacteria';

		// Now mark all neighbours as having this bacteria nearby.
		for (let coords of [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]) {
			this.surroundedCell(x + coords[0], y + coords[1], bacteria);
		}
	}

	surroundedCell(x, y, bacteria) {
		if (this.markCell(x, y)) {
			let pos = x + ',' + y;
			if (!this.trackedCells[pos].surrounding[bacteria.id])
				this.trackedCells[pos].surrounding[bacteria.id] = {type: bacteria, quantity: 0};
			this.trackedCells[pos].surrounding[bacteria.id].quantity++;
		}
	}

	markCell(x, y) {
		if (x > -1 && y > -1 && x < this.size - 1 && y < this.size - 1) {
			let pos = x + ',' + y;
			if (!this.trackedCells[pos])
				this.trackedCells[pos] = new CellTracker(x, y, this.getCell(x, y).type);
			return true;
		}
		return false;
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
