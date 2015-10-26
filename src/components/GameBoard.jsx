var React = require('react');
var Square = require('./Square.jsx');

class Main extends React.Component {
    render() {
        var rows = [];
        for (var i = 0; i < this.props.boardSize; ++i) {
            var row = [];

            for (var j = 0; j < this.props.boardSize; ++j) {
                row.push(<Square key={i.toString() + j.toString()} />);
            }

            rows.push(<div>{row}</div>);
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

module.exports = Main;
