'use strict';

class Board {
    constructor(id, horizontalDim, verticalDim) {
        this.id = id;
        this.horizontalDim = horizontalDim;
        this.verticalDim = verticalDim;
        this.board = [];
        for (let i = 0; i < horizontalDim; i++) {
            for (let j = 0; j < verticalDim; j++) {
                this.board[i][j] = new Cell(x, y, getRandomType());
            }
        }
    }

    getRandomType() {
        let dice = Math.random() * 100;
        if (dice < 7)
            return 2;

        if (dice < 14)
            return 3;

        if (dice < 21)
            return 4;

        return 1;
    }
}
