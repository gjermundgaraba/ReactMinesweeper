
class MineSweeperEngine {
    constructor(size, numberOfMines) {
        this.gameOver = false;
        this.size = size;
        var level = [];

        setUpLevel();
        dealBombs();

        this.level = level;

        function setUpLevel() {
            for (var y = 0; y < size; ++y) {
                var row = [];

                for (var x = 0; x < size; ++x) {
                    row.push({
                        bomb: false,
                        open: false,
                        numberOfBombsNear: 0
                    });
                }

                level.push(row);
            }
        }

        function dealBombs() {
            for (var i = 0; i < numberOfMines; ++i) {
                dealOneRandomBomb();
            }
        }

        function dealOneRandomBomb() {
            var randomX = getRandomInt(0, size);
            var randomY = getRandomInt(0, size);

            var square = level[randomY][randomX];
            if (!square.bomb) {
                square.bomb = true;
                updateNearSquares(randomX, randomY);
            } else {
                dealOneRandomBomb();
            }
        }

        function updateNearSquares(x, y) {
            var nearSquareCoordinates = getNearSquareCoordinates(x, y, size);

            for (var i = 0; i < nearSquareCoordinates.length; ++i) {
                level[nearSquareCoordinates[i].y][nearSquareCoordinates[i].x].numberOfBombsNear++;
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
    getLevel() {
        return this.level;
    }
    squareSelected(x, y) {
        if (!this.gameOver) {
            var square = this.level[y][x];

            if (!square.open && !square.bomb && square.numberOfBombsNear === 0) {
                square.open = true;
                var nearSquareCoordinates = getNearSquareCoordinates(x, y, this.size);
                for (var i = 0; i < nearSquareCoordinates.length; ++i) {
                    this.squareSelected(nearSquareCoordinates[i].x, nearSquareCoordinates[i].y);
                }
            } else {
                square.open = true;
            }

            if (square.bomb) {
                this.gameOver = true;
            }
        }

        return this.level;
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