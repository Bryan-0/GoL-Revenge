'use strict';

class Cell {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.inhabitant = {};
    }

    inhabit(obj) {
        this.inhabitant = obj;
    }
}
