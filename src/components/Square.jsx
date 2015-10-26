var React = require('react');

class Square extends React.Component {
    render() {
        console.log(this.props.bomb);
        return (
            <span onClick={this.props.onSquareClick} className="square">&nbsp;</span>
        );
    }
}

module.exports = Square;