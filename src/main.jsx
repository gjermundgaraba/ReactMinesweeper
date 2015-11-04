var React = require('react');
var ReactDOM = require('react-dom');
var GameBoard = require('./components/GameBoard.jsx');

class Main extends React.Component {
    constructor() {
        super();
        this._resetGame = this._resetGame.bind(this);
    }
    render() {
        return (
            <div>
                <h1>Minesweeper</h1>
                <button onClick={this._resetGame}>Restart Game!</button>
                <GameBoard ref="gameboard" size="20" mines="10" />
            </div>
        );
    }
    _resetGame() {
        console.log(this.refs);
        this.refs.gameboard.resetGame();
    }
}

ReactDOM.render(<Main />, document.getElementById("app-body"));