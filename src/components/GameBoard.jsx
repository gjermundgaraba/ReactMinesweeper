var React = require('react');
var Square = require('./Square.jsx');

class Main extends React.Component {
    render() {
        var rows = [];
        for (var i = 0; i < 10; ++i) {
            var row = [];

            for (var j = 0; j < 10; ++j) {
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
