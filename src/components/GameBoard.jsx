var React = require('react');
var Square = require('./Square.jsx');
var MineSweeperEngine = require('../MineSweeperEngine.js');

class GameBoard extends React.Component {
    constructor() {
        super();
        this._handleSquareClick = this._handleSquareClick.bind(this);
        this._handleSquareRightClick = this._handleSquareRightClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }
    componentWillMount() {
        this.resetGame();
    }
    render() {
        var rows = this.generateRows(this.state.game.level);
        var header = this.generateHeader(this.state.game);

        return (
            <div>
                {header}
                {rows}
            </div>
        );
    }
    generateHeader(game) {
        var header;

        if (game.over) {
            if (game.won) {
                header = <div>Game Won!</div>;
            } else {
                header = <div>Game Over! Game Lost!</div>;
            }
        }

        return header;
    }
    generateRows(level) {
        var rows = [];

        for (var y = 0; y < this.boardSize; ++y) {
            var row = [];

            for (var x = 0; x < this.boardSize; ++x) {
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
                <div key={y}>
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
    resetGame() {
        this.boardSize = this.props.size;
        this.numberOfMines = this.props.mines;
        this.mineSweeperEngine = new MineSweeperEngine(this.boardSize, this.numberOfMines);
        this.setState({
            game: this.mineSweeperEngine.getGame()
        });
    }
}

module.exports = GameBoard;
