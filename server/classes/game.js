'use strict';

const Bacteria = require('./bacteria.js');

const PLAYER_AREA = 16;

class Game {
    constructor(owner, board) {
        this.owner = owner;
        this.board = board;
        this.status = 1;
        this.generation = 0;
        this.players = new Map();
        this.addPlayer(this.owner);
        this.entropy = 21;
        this.lockedOnPlay = true;
        this.playInterval = null;
    }

    addPlayer(player) {
        this.players.set(player.id, player);
        this.updateBoardSize();
    }

    updateBoardSize() {
        let newNum = PLAYER_AREA + this.players.size * PLAYER_AREA
        if (newNum > this.board.size)
            this.board.size = newNum;
    }

    populateCells(bactProto, pos) {
        let range = Math.floor(Math.random() * PLAYER_AREA) + 1;
        for (let coord of bactProto.pattern) {
            this.board.populateCell(pos * range + coord.x, pos * range + coord.y, new Bacteria(bactProto.owner, bactProto.genetics));
        }
    }

    start() {
        this.board.createCells();
        let count = 1;
        this.players.forEach(player => {
            this.populateCells(player.bacteriaPrototype, count);
            count++;
        });
    }

    next() {
        // Siguiente generación, corre por todo el mapa y cambia todos los estados
        this.runGeneration();
    }

    startAutomation() {
        this.playInterval = setInterval(() => {
            this.next();
            this.reportStatus();
        }, 500);
    }

    pause() {
        clearInterval(this.playInterval);
    }

    runGeneration() {
        if (this.status !== 2)
            return;

        for (let cell of this.board.board) {
            board.evaluateGeneration(cell[x], cell[y]);
            console.log('Evaluating on ' + cell[x] + cell[y]);
        }
        this.generation++;
    }

    reportStatus() {
        this.board.show();
    }
}

module.exports = Game;
