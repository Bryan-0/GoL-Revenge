'use strict';

class Bacteria {
	constructor(owner, genetics) {
		this.owner = owner;
		// Each empty cell which has three or more neighbours, gets populated by this one.
		// It must be less than overpopulation, and more than solitude.
		this.fertility = genetics.fertility;
		// Each cell which has `solitude` or less neighbours of the same species, dies.
		// It must be the smallest number.
		this.solitude = genetics.solitude;
		// Each cell which is surrounded by `overpopulation` or more of the same species, dies.
		// It must be the highest number.
		this.overpopulation = genetics.overpopulation;
		this.color = genetics.color;
	}

	toString() {
		let color = 0;
		for (let char of this.owner.id) {
			color += parseInt(char.charCodeAt(0));
		}
		let possible = (5 * color +1) % 37 + 1;
		if (possible < 31) {
			possible = (5 * color + 1) % 37 + 30
		}
		color = '';
		if (possible > 37) {
			possible -= Math.floor((possible - 37) / 2);
			if (possible < 30)
				possible = 30;
			color = '1;';
		}
		color += possible;
		return '|\x1B[' + color + 'mB\x1B[0m';
	}
}

module.exports = Bacteria;
