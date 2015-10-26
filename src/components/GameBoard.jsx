var React = require('react');
var Square = require('./Square.jsx');
var MineSweeperEngine = require('../MineSweeperEngine.js');

class GameBoard extends React.Component {
    constructor() {
        this._handleSquareClick = this._handleSquareClick.bind(this);
    }
    render() {
        this.mineSweeperEngine = new MineSweeperEngine(this.props.boardSize);
        var rows = this.generateRows(this.mineSweeperEngine.getLevel());
        return (
            <div>
                {rows}
            </div>
        );
    }
    generateRows(level) {
        var rows = [];

        for (var i = 0; i < this.props.boardSize; ++i) {
            var row = [];

            for (var j = 0; j < this.props.boardSize; ++j) {
                var hasBomb = level[i][j].bomb;
                row.push(<Square onSquareClick={this._handleSquareClick} bomb={hasBomb} key={i.toString() + j.toString()}/>);
            }

            rows.push(<div>{row}</div>);
        }

        return rows;
    }
    _handleSquareClick() {
        console.log('CLICK!');
    }
}

module.exports = GameBoard;
