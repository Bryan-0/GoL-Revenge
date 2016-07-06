const assert = require('assert');
const Bacteria = require('./../classes/bacteria.js');
const Cell = require('./../classes/cell.js');
const CellTracker = require('./../classes/cell-tracker.js');
const CellTypes = require('./../constants/cell-types.js');
const FakeUser = require('./../classes/test/fake-user.js');

describe('Cell', () => {
	it('should be the proper type', () => {
		let cell = new Cell(CellTypes.EMPTY);
		assert.strictEqual(cell.type, CellTypes.EMPTY);
	});

	it('should change the type properly', () => {
		let cell = new Cell(CellTypes.EMPTY);
		cell.makeType(CellTypes.ROCK);
		assert.strictEqual(cell.type, CellTypes.ROCK);
	});

	it('should inhabit with a bacteria', () => {
		let cell = new Cell(CellTypes.EMPTY);
		cell.inhabit(new Bacteria(new FakeUser(), {genetics: {fertility: 2, overpopulation: 5, solitude: 1, color: 'F00'}}));
		assert.strictEqual(cell.isHabitated(), true);
	});
});
