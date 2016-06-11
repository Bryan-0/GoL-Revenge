const assert = require('assert');
const Game = require('./../classes/game.js');
const User = require('./../classes/user.js');
const Board = require('./../classes/board.js');
const FakeSocket = require('./../classes/test/fake-socket.js');

describe('Game of Life', () => {
	it('should work', () => {
		let owner = new User(new FakeSocket());
		owner.usePrototype({
			genetics: {fertility: 1, mortality: 4, stability: 0, color: '#0F6'},
			pattern: {}
		});
		let board = new Board();
		let game = new Game(owner, board);
		let playerTwo = new User(new FakeSocket());
		playerTwo.usePrototype({fertility: 2, mortality: 0, stability: 1, color: '#F00'});
		game.addPlayer(playerTwo);
		game.start();
		game.next();
		console.log(game.boardStatus());
	});
});
