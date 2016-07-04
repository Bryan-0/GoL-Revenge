const assert = require('assert');
const Game = require('./../classes/game.js');
const User = require('./../classes/user.js');
const Board = require('./../classes/board.js');
const FakeSocket = require('./../classes/test/fake-socket.js');

describe('Game of Life', () => {
	let owner = new User(new FakeSocket());
	owner.usePrototype({genetics: {fertility: 1, overpopulation: 4, solitude: 0, color: '0F6'}});
	let board = new Board();
	let game = new Game(owner, board);
	let playerTwo = new User(new FakeSocket());
	playerTwo.usePrototype({genetics: {fertility: 2, overpopulation: 5, solitude: 1, color: 'F00'}});
	game.addPlayer(playerTwo);
	let three = new User(new FakeSocket());
	let four = new User(new FakeSocket());
	game.addPlayer(three);
	game.addPlayer(four);

	it('should work', () => {
		game.start();
		game.reportStatus();
	});

	it('nextGen?', () => {
		game.next();
		game.reportStatus();
	});
});
