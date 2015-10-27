var React = require('react');
var Square = require('./Square.jsx');
var MineSweeperEngine = require('../MineSweeperEngine.js');

class GameBoard extends React.Component {
    constructor() {
        this._handleSquareClick = this._handleSquareClick.bind(this);
        this.mineSweeperEngine = new MineSweeperEngine(10);
        this.state = {
            level: this.mineSweeperEngine.getLevel()
        };
    }
    render() {
        var rows = this.generateRows(this.state.level);
        return (
            <div>
                {rows}
            </div>
        );
    }
    generateRows(level) {
        var rows = [];

        for (var y = 0; y < 10; ++y) {
            var row = [];

            for (var x = 0; x < 10; ++x) {
                var hasBomb = level[y][x].bomb;
                var isOpen = level[y][x].open;
                row.push(<Square onSquareClick={this._handleSquareClick} x={x} y={y} bomb={hasBomb} open={isOpen} key={x.toString() + y.toString()}/>);
            }

            rows.push(<div>{row}</div>);
        }

        return rows;
    }
    _handleSquareClick(x, y) {
        var newLevel = this.mineSweeperEngine.squareSelected(x, y);
        this.setState({
            level: newLevel
        })

    }
}

module.exports = GameBoard;
