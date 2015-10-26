var React = require('react');
var GameBoard = require('./components/GameBoard.jsx');

class Main extends React.Component {
    render() {
        return <GameBoard boardSize='10' />
    }
}

React.render(<Main />, document.body);