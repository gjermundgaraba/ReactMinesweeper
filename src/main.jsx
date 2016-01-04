var React = require('react');
var ReactDOM = require('react-dom');
var GameBoard = require('./components/GameBoard.jsx');

class Main extends React.Component {
    constructor() {
        super();
        this._resetGame = this._resetGame.bind(this);
        this.handleGameBoardSizeChange = this.handleGameBoardSizeChange.bind(this);
        this.handleNumberOfMinesChange = this.handleNumberOfMinesChange.bind(this);
    }
    componentWillMount() {
        this.setState({
            gameBoardSize: 20,
            numberOfMines: 15
        })
    }
    handleGameBoardSizeChange(event) {
        this.setState({
            gameBoardSize: event.target.value
        });
    }
    handleNumberOfMinesChange(event) {
        this.setState({
            numberOfMines: event.target.value
        });
    }
    render() {
        console.log('render');
        var gameBoardSize = this.state.gameBoardSize;
        var numberOfMines = this.state.numberOfMines;
        return (
            <div>
                <h1>Minesweeper</h1>
                Game Board Size: <input type="number" value={gameBoardSize} onChange={this.handleGameBoardSizeChange} />
                <br />
                Number of Mines: <input type="number" value={numberOfMines} onChange={this.handleNumberOfMinesChange} />
                <br />
                <button onClick={this._resetGame}>Restart Game!</button>
                <GameBoard ref="gameboard" size={gameBoardSize} mines={numberOfMines} />
            </div>
        );
    }
    _resetGame() {
        console.log(this.refs);
        this.refs.gameboard.resetGame();
    }
}

ReactDOM.render(<Main />, document.getElementById("app-body"));