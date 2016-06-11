'use strict';

class Bacteria {
    constructor(owner, fert = 1, mort = 1, stab = 1, color) {
        this.owner = owner;
        this.fertility = fert;
        this.mortality = mort;
        this.stability = stab;
        this.color = color || (fert + mort + stab) * 0x01;
    }
}
