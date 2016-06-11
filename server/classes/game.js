'use strict';

class Game {
	constructor(owner, board) {
		this.owner = owner;
		this.board = board;
		this.status = 1;
		this.generation = 0;
		this.players = new Map();
		this.addPlayer(this.owner);
	}

	addPlayer(player) {
		this.players.set(player.id, player);
	}

	start() {
		// ¿QUé hace?
		// Hace falta poner el patrón del jugador dentro del mapa
	}

	next() {
		// Siguiente generación, corre por todo el mapa y cambia todos los estados
	}

	pause() {
		// Pausa la iteración del juego (timer)
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
