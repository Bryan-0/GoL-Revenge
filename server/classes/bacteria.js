'use strict';

class Bacteria {
	constructor(owner, genetics) {
		this.owner = owner;
		this.fertility = genetics.fertility;
		this.mortality = genetics.mortality;
		this.stability = genetics.stability;
		this.color = genetics.color;
	}
}

module.exports = Bacteria;
