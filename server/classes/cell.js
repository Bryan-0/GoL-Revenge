'use strict';

class Cell {
    constructor() {
        this.type = 1;
        this.inhabitant = {};
    }

	makeType(type) {
		this.type = type;
	}

    inhabit(obj) {
        this.inhabitant = obj;
    }
}
