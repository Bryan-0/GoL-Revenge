'use strict';

class Game {
	constructor(owner, board) {
		this.owner = owner;
		this.board = board;
		this.status = 1;
		this.generation = 0;
	}

	runGeneration() {
		if (this.status !== 2)
			return;

		for (let cell of this.board.board) {

		}
		this.generation++;
	}
}

module.exports = Game;
