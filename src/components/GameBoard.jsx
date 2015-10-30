var React = require('react');
var Square = require('./Square.jsx');
var MineSweeperEngine = require('../MineSweeperEngine.js');

class GameBoard extends React.Component {
    constructor() {
        this.BOARD_SIZE = 20;
        this.NUMBER_OF_MINES = 40;

        this._handleSquareClick = this._handleSquareClick.bind(this);
        this._resetGame = this._resetGame.bind(this);

        this.mineSweeperEngine = new MineSweeperEngine(this.BOARD_SIZE, this.NUMBER_OF_MINES);
        this.state = {
            level: this.mineSweeperEngine.getLevel()
        };
    }
    render() {
        var rows = this.generateRows(this.state.level);

        return (
            <div>
                <h1>Mine Sweeper</h1>
                {rows}
                <button onClick={this._resetGame}>Restart Game!</button>
            </div>
        );
    }
    generateRows(level) {
        var rows = [];

        for (var y = 0; y < this.BOARD_SIZE; ++y) {
            var row = [];

            for (var x = 0; x < this.BOARD_SIZE; ++x) {
                var hasBomb = level[y][x].bomb;
                var isOpen = level[y][x].open;
                var numberOfBombsNear = level[y][x].numberOfBombsNear;
                row.push(<Square
                    onSquareClick={this._handleSquareClick}
                    x={x}
                    y={y}
                    bomb={hasBomb}
                    open={isOpen}
                    numberOfBombsNear={numberOfBombsNear}
                    key={x.toString() + y.toString()}/>);
            }

            rows.push(<div>{row}</div>);
        }

        return rows;
    }
    _handleSquareClick(x, y) {
        var newLevel = this.mineSweeperEngine.squareSelected(x, y);
        this.setState({
            level: newLevel
        });
    }
    _resetGame() {
        this.mineSweeperEngine = new MineSweeperEngine(this.BOARD_SIZE, this.NUMBER_OF_MINES);
        this.setState({
            level: this.mineSweeperEngine.getLevel()
        });
    }
}

module.exports = GameBoard;
