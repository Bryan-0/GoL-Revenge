const assert = require('assert');
const Game = require('./../classes/game.js');
const User = require('./../classes/user.js');
const Board = require('./../classes/board.js');
const FakeSocket = require('./../classes/test/fake-socket.js');

describe('Game of Life', () => {
	let owner = new User(new FakeSocket());
	owner.usePrototype({
		pattern: [{x: 2, y: 1}, {x: 3, y: 2}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}]
	});
	let board = new Board();
	let game = new Game(owner, board);
	let two = new User(new FakeSocket());
	game.addPlayer(two);
	let three = new User(new FakeSocket());
	three.usePrototype({genetics: {fertility: 2, overpopulation: 5, solitude: 1, color: 'F00'}});
	let four = new User(new FakeSocket());
	game.addPlayer(three);
	game.addPlayer(four);

	it('should work', () => {
		game.start();
		game.reportStatus();
		game.next();
		game.reportStatus();
	});
});
