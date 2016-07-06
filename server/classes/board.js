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

	createCells() {
		for (let x = 0; x < this.size; x++) {
			if (!this.board[x]) this.board[x] = [];
			for (let y = 0; y < this.size; y++) {
				this.board[x][y] = new Cell(this.getRandomType());
			}
		}
	}

	passBoardState() {
		for (let x = 0; x < this.board.length; x++) {
			for (let y = 0; y < this.board[x].length; y++) {
				this.nextBoard[x][y] = new Cell();
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
		// Prepare the new board, which will take place on the current array.
		this.nextBoard = [];
		let currentAlive = [];
		let bacterias = [];

		// Check each tracked cell and its state to calculate the next state for each position.
		for (let theCoords in this.trackedCells) {
			let trackedState = this.trackedCells[theCoords];

			if (trackedState.hasBacteria()) {
				// The cell has a Bacteria living on it.
				currentAlive.push(trackedState.pos.x + ',' + trackedState.pos.y);
				// Check now if it stays alive.
				let bacteria = this.getCell(trackedState.pos.x, trackedState.pos.y).inhabitant;
				if (trackedState.surrounding[bacteria.id]) {
					if (trackedState.surrounding[bacteria.id].quantity < bacteria.overpopulation && trackedState.surrounding[bacteria.id].quantity > bacteria.solitude) {
						// It does not die, we store it as a survivor.
						bacterias[trackedState.pos.x + ',' + trackedState.pos.y] = bacteria;
						continue;
					}
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
				bacterias[trackedState.pos.x + ',' + trackedState.pos.y] = reproducers[0];
			}
			// Several reproduction rules apply. Make new Bacteria.
			if (reproducers.length > 1) {
				bacterias[trackedState.pos.x + ',' + trackedState.pos.y] = new Bacteria(new FakeUser(), this.bestGenetics(reproducers));
			}
		}
		this.updateBoardState(currentAlive, bacterias);
	}

	// Given a list of currently alive bacteria and an object with the bacterias on the next state, updates the board state.
	updateBoardState(currentAlive, nextStateLiving) {
		// Kill bacterias on coordinates where they aren't gonna survive.
		let livinCoords = Object.keys(nextStateLiving);
		for (let coords of currentAlive) {
			if (livinCoords.indexOf(coords) === -1) {
				let [x, y] = coords.split(',');
				this.board[x][y].kill();
				this.totalBacteria--;
				delete this.trackedCells[x + ',' + y];
			}
		}

		// Proceed to set the next bacterias alive on the board.
		for (let coords in nextStateLiving) {
			if (currentAlive.indexOf(coords) === -1) {
				let [x, y] = coords.split(',');
				this.populateCell(x, y, nextStateLiving[coords]);
			}
		}
	}

	bestGenetics(reproducers) {
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
		return proto;
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
			this.surroundedCell(this.trackedCells, x + coords[0], y + coords[1], bacteria);
		}
	}

	surroundedCell(trackedCells, x, y, bacteria) {
		if (this.markCell(x, y)) {
			let pos = x + ',' + y;
			if (!trackedCells[pos].surrounding[bacteria.id])
				trackedCells[pos].surrounding[bacteria.id] = {type: bacteria, quantity: 0};
			trackedCells[pos].surrounding[bacteria.id].quantity++;
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
