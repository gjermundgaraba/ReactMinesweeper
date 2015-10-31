
class MineSweeperEngine {
    constructor(size, numberOfMines) {
        this.game = {
            over: false,
            won: false,
            size: size,
            level: []
        };

        setUpLevel.call(this);
        dealBombs.call(this);

        function setUpLevel() {
            for (var y = 0; y < size; ++y) {
                var row = [];

                for (var x = 0; x < size; ++x) {
                    row.push({
                        bomb: false,
                        open: false,
                        marked: false,
                        numberOfBombsNear: 0
                    });
                }

                this.game.level.push(row);
            }
        }

        function dealBombs() {
            for (var i = 0; i < numberOfMines; ++i) {
                dealOneRandomBomb.call(this);
            }
        }

        function dealOneRandomBomb() {
            var randomX = getRandomInt(0, size);
            var randomY = getRandomInt(0, size);

            var square = this.game.level[randomY][randomX];
            if (!square.bomb) {
                square.bomb = true;
                updateNearSquares.call(this, randomX, randomY);
            } else {
                dealOneRandomBomb.call(this);
            }
        }

        function updateNearSquares(x, y) {
            var nearSquareCoordinates = getNearSquareCoordinates(x, y, size);

            for (var i = 0; i < nearSquareCoordinates.length; ++i) {
                this.game.level[nearSquareCoordinates[i].y][nearSquareCoordinates[i].x].numberOfBombsNear++;
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
    getGame() {
        return this.game;
    }
    squareSelected(x, y) {
        if (!this.game.over && !this.game.won) {
            var square = this.game.level[y][x];

            if (!square.open && !square.bomb && square.numberOfBombsNear === 0) {
                square.marked = false;
                square.open = true;
                var nearSquareCoordinates = getNearSquareCoordinates(x, y, this.game.size);
                for (var i = 0; i < nearSquareCoordinates.length; ++i) {
                    this.squareSelected(nearSquareCoordinates[i].x, nearSquareCoordinates[i].y);
                }
            } else {
                square.marked = false;
                square.open = true;
            }

            if (square.bomb) {
                this.game.over = true;
            }

            this.game.won = this.isGameWon();

        }

        return this.game;
    }
    squareMarked(x, y) {
        if (!this.game.over && !this.game.won) {
            var square = this.game.level[y][x];

            if (!square.open) {
                square.marked = true;
            }

            this.game.won = this.isGameWon();
        }

        return this.game;
    }
    isGameWon() {
        if (!this.game.over) {
            for (var y = 0; y < this.game.size; ++y) {
                for (var x = 0; x < this.game.size; ++x) {
                    var square = this.game.level[y][x];
                    if (square.bomb && (square.open || !square.marked)) {
                        return false;
                    }
                    if (!square.bomb && !square.open) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }
}

function getNearSquareCoordinates(x, y, size) {
    var nearSquareCoordinates = [
        {x: x-1, y: y},
        {x: x-1, y: y-1},
        {x: x-1, y: y+1},
        {x: x+1, y: y},
        {x: x+1, y: y-1},
        {x: x+1, y: y+1},
        {x: x, y: y-1},
        {x: x, y: y+1}
    ];

    for (var i = 0; i < nearSquareCoordinates.length; ++i) {
        var currentCoordinate = nearSquareCoordinates[i];
        if (currentCoordinate.x < 0 || currentCoordinate.x >= size || currentCoordinate.y < 0 || currentCoordinate.y >= size) {
            nearSquareCoordinates.splice(i, 1);
            --i;
        }
    }

    return nearSquareCoordinates;
}

module.exports = MineSweeperEngine;