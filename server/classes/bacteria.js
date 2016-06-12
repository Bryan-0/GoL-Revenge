'use strict';

class Bacteria {
	constructor(owner, genetics) {
		this.owner = owner;
		this.fertility = genetics.fertility;
		this.mortality = genetics.mortality;
		this.stability = genetics.stability;
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
