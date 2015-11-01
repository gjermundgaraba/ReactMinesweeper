var React = require('react');
var Square = require('./Square.jsx');
var MineSweeperEngine = require('../MineSweeperEngine.js');

class GameBoard extends React.Component {
    constructor() {
        this.BOARD_SIZE = 10;
        this.NUMBER_OF_MINES = 5;

        this._handleSquareClick = this._handleSquareClick.bind(this);
        this._handleSquareRightClick = this._handleSquareRightClick.bind(this);
        this._resetGame = this._resetGame.bind(this);

        this.mineSweeperEngine = new MineSweeperEngine(this.BOARD_SIZE, this.NUMBER_OF_MINES);
        this.state = {
            game: this.mineSweeperEngine.getGame()
        };
    }
    render() {
        var rows = this.generateRows(this.state.game.level);

        return (
            <div>
                <h1>Minesweeper {this.state.game.won ? 'GAME WON!': ''} {this.state.game.over ? 'GAME OVER!': ''}</h1>
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
                var isMarked = level[y][x].marked;
                var numberOfBombsNear = level[y][x].numberOfBombsNear;
                row.push(<Square
                    onSquareClick={this._handleSquareClick}
                    onRightClick={this._handleSquareRightClick}
                    x={x}
                    y={y}
                    bomb={hasBomb}
                    marked={isMarked}
                    open={isOpen}
                    numberOfBombsNear={numberOfBombsNear}
                    key={x.toString() + y.toString()}/>);
            }

            rows.push(
                <div>
                    {row}
                </div>
            );
        }

        return rows;
    }
    _handleSquareClick(x, y) {
        var updatedGame = this.mineSweeperEngine.squareSelected(x, y);
        this.setState({
            game: updatedGame
        });
    }
    _handleSquareRightClick(x, y) {
        var updatedGame = this.mineSweeperEngine.squareMarked(x, y);
        this.setState({
            game: updatedGame
        });
    }
    _resetGame() {
        this.mineSweeperEngine = new MineSweeperEngine(this.BOARD_SIZE, this.NUMBER_OF_MINES);
        this.setState({
            game: this.mineSweeperEngine.getGame()
        });
    }
}

module.exports = GameBoard;
