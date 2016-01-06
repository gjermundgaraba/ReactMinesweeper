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
        var gameBoardSize = this.state.gameBoardSize;
        var numberOfMines = this.state.numberOfMines;

        var gameBoardSizeOptions = [];
        for (var i = 4; i < 50; ++i) {
            gameBoardSizeOptions.push(<option value={i} selected={gameBoardSize == i}>{i}</option>);
        }

        var numberOfMinesOptions = [];
        for (var j = 4; j < 50; ++j) {
            numberOfMinesOptions.push(<option value={j} selected={numberOfMines == j}>{j}</option>);
        }

        return (
            <div className="game-area">
                <h1>Minesweeper</h1>

                <form className="pure-form pure-form-aligned">
                    <div className="pure-control-group">
                        <label for="gameBoardSizeSelect">Game Board Size </label>
                        <select id="gameBoardSizeSelect" onChange={this.handleGameBoardSizeChange}>
                            {gameBoardSizeOptions}
                        </select>
                    </div>

                    <div className="pure-control-group">
                        <label for="gameBoardMineNumberSelect">Number of Mines</label>
                        <select id="gameBoardMineNumberSelect" onChange={this.handleNumberOfMinesChange}>
                            {numberOfMinesOptions}
                        </select>
                    </div>

                    <div className="pure-controls">
                        <button type="button" className="pure-button pure-button-primary" onClick={this._resetGame}>Restart Game!</button>
                    </div>

                </form>

                <GameBoard ref="gameboard" size={gameBoardSize} mines={numberOfMines} />
            </div>
        );
    }
    _resetGame() {
        this.refs.gameboard.resetGame();
    }
}

ReactDOM.render(<Main />, document.getElementById("app-body"));