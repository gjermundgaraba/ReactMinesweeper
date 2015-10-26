
class MineSweeperEngine {
    constructor(size) {
        var level = [];

        for (var i = 0; i < size; ++i) {
            var row = [];

            for (var j = 0; j < size; ++j) {
                row.push({
                    bomb: getRandomBomb()
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
}

module.exports = MineSweeperEngine;