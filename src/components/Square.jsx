var React = require('react');
var classNames = require( 'classnames' );


class Square extends React.Component {
    render() {
        var classes = classNames( this.props.className, {
            'square': true,
            'open': this.props.open,
            'bomb': this.props.bomb
        } );

        return (
            <span onClick={this.props.onSquareClick.bind(this, this.props.x, this.props.y)} className={classes}>
                {(this.props.open && this.props.numberOfBombsNear > 0 && !this.props.bomb) ? this.props.numberOfBombsNear : '\xa0'}
            </span>
        );
    }
}

module.exports = Square;