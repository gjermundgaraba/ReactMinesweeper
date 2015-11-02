var React = require('react');
var ReactDOM = require('react-dom');
var GameBoard = require('./components/GameBoard.jsx');

class Main extends React.Component {
    render() {
        return <GameBoard />
    }
}

ReactDOM.render(<Main />, document.getElementById("app-body"));