var React = require('react');
var GameBoard = require('./components/GameBoard.jsx');

class Main extends React.Component {
    render() {
        return <GameBoard />
    }
}

React.render(<Main />, document.body);