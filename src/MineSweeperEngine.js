
class MineSweeperEngine {
    constructor(size) {
        var level = [];

        for (var y = 0; y < size; ++y) {
            var row = [];

            for (var x = 0; x < size; ++x) {
                row.push({
                    bomb: getRandomBomb(),
                    open: false
                });
            }

            level.push(row);
        }

        this.level = level;

        function getRandomBomb() {
            return Math.random() < 0.5;
        }
    }
    getLevel() {
        return this.level;
    }
    squareSelected(x, y) {
        this.level[y][x].open = true;
        return this.level;
    }
}

module.exports = MineSweeperEngine;