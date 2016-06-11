'use strict';

class Game {
    constructor(owner, board) {
		this.owner = owner;
		this.board = board;
		this.status = 1;
		this.generation = 0;
		this.players = new Map();
		this.addPlayer(this.owner);
		this.entropy = 20;
    }

    addPlayer(player) {
        this.players.set(player.id, player);
    }

	populateCells(bactProto, x, y) {
        for (let coord of bactProto.pattern) {
            this.board.populateCell(x + coord.x, y + coord.y, new Bacteria(bactProto.owner, bactProto.genetics));
        }
    }

    start() {
		this.board.size = 16 + this.players.size * 16;
		this.board.createCells();
        let count = 0;
        this.players.forEach(player => {
            this.populateCells(player.bacteriaPrototype, x, y);

            count++;
        });
    }

    next() {
        // Siguiente generación, corre por todo el mapa y cambia todos los estados
    }

    pause() {
        // Pausa la iteración del juego (timer)
    }

    startAutomatic() {
        // Aquí el juego corre automáticamente
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
