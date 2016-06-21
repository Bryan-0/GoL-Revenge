'use strict';

const Cell = require('./cell.js');

class Board {
<<<<<<< HEAD
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

    evaluateGeneration(x, y) {
        //TODO Write me!
        let neighbourBacteria = getNeighbourBacteria(x, y);

		//NECESITO LINQ

		//neighbourBacteria.GroupBy(bacteria.owner);

    }

    getNeighbourBacteria(x, y) {
        let neighbourBacteria = [];
        let bacteriaCount = 0;

        if (isHabitated(x - 1, y - 1)) {
            neighbourBacteria[bacteriaCount] = board[x - 1][y - 1].inhabitant;
            bacteriaCount++;
        }

        if (isHabitated(x, y - 1)) {
            neighbourBacteria[bacteriaCount] = board[x][y - 1].inhabitant;
            bacteriaCount++;
        }

        if (isHabitated(x + 1, y - 1)) {
            neighbourBacteria[bacteriaCount] = board[x + 1][y - 1].inhabitant;
            bacteriaCount++;
        }

        if (isHabitated(x - 1, y)) {
            neighbourBacteria[bacteriaCount] = board[x - 1][y].inhabitant;
            bacteriaCount++;
        }

        if (isHabitated(x + 1, y)) {
            neighbourBacteria[bacteriaCount] = board[x + 1][y].inhabitant;
            bacteriaCount++;
        }

        if (isHabitated(x - 1, y + 1)) {
            neighbourBacteria[bacteriaCount] = board[x - 1][y + 1].inhabitant;
            bacteriaCount++;
        }

        if (isHabitated(x, y + 1)) {
            neighbourBacteria[bacteriaCount] = board[x][y + 1].inhabitant;
            bacteriaCount++;
        }

        if (isHabitated(x + 1, y + 1)) {
            neighbourBacteria[bacteriaCount] = board[x + 1][y + 1].inhabitant;
            bacteriaCount++;
        }

        return neighbourBacteria;

		//TODO Revisar esto: estoy evaluando dos veces.
		// No exactamente dos veces, sino algo más grave.
    }
=======
	constructor() {
		this.board = [];
		this.size = 15;
		this.totalBacteria = 0;
		this.habitatedCells = {};
	}

	// Esto da puta vergüenza. Por favor, hay que mejorarlo.
	nextState() {
		let newState = [];
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				// 1. Si está rodeada de células del mismo tipo con una fertilidad adecuada y está vacía, se crea una célula
				// 2. Si está rodeada de células del mismo tipo y el número es de equidad, se mantiene.
				// 3. ...si el número es de morir, pos muerto.
				// 4. Si hay células distintas, hay que contabilizar las reglas por todas ellas.
				// 5. Si hay célulsa distintas fértiles, hay que hacer una mezcla que coja la mejor genética.
				let adjacents = {};
				let cellIn = false;
				if (this.board[x][y].inhabitant) {
					adjacents[this.board[x][y].inhabitant.owner.id] = 0;
				}

				if (y > 0) {
					this.updateAdjacents(adjacents, this.board[x][y-1].inhabitant);

					if (x > 0) {
						this.updateAdjacents(adjacents, this.board[x-1][y-1].inhabitant);
					}

					if (x < this.size - 1) {
						this.updateAdjacents(adjacents, this.board[x+1][y-1].inhabitant);
					}
				}

				if (x > 0) {
					this.updateAdjacents(adjacents, this.board[x-1][y].inhabitant);
				}

				if (x < this.size - 1) {
					this.updateAdjacents(adjacents, this.board[x+1][y].inhabitant);
				}

				if (y < this.size - 1) {
					this.updateAdjacents(adjacents, this.board[x][y+1].inhabitant);

					if (x > 0) {
						this.updateAdjacents(adjacents, this.board[x-1][y+1].inhabitant);
					}

					if (x < this.size - 1) {
						this.updateAdjacents(adjacents, this.board[x+1][y+1].inhabitant);
					}
				}

				if (Object.keys(adjacents).length > 0) {
					if (this.board[x][y].inhabitant) {
						if (adjacents[this.board[x][y].inhabitant.owner.id]) {
							// Dies if too few or too much adjacent Bacteria of the same type.
							if (adjacents[this.board[x][y].inhabitant.owner.id] >= this.board[x][y].inhabitant.overpopulation || adjacents[this.board[x][y].inhabitant.owner.id] <= this.board[x][y].inhabitant.solitude)
								this.killCell(x, y);
							continue;
						}
						// If we are here, it means there are no adjacent Bacteria. This always result in death.
						this.killCell(x, y);
					}

					// Check if this cell becomes populated.
					let populators = [];

				}
			}
		}
	}

	updateAdjacents(adjacents, cellIn) {
		if (cellIn) {
			if (!adjacents[cellIn.owner.id])
				adjacents[cellIn.owner.id] = 0;
			adjacents[cellIn.owner.id]++;
		}
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
		if (this.board[x][y].inhabit(bacteria))
			this.totalBacteria++;
		this.habitatedCells[x + ', ' + y] = true;
	}

	killCell(x, y) {
		if (this.board[x][y].kill())
			this.totalBacteria--;
		if (this.habitatedCells[x + ', ' + y])
			delete this.habitatedCells[x + ', ' + y];
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
>>>>>>> a3d7a445694ae80cacfe082ed7b936b100dac54f
}

module.exports = Board;
