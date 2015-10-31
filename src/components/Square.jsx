var React = require('react');
var classNames = require( 'classnames' );


class Square extends React.Component {
    constructor() {
        this._contextClick = this._contextClick.bind(this);
    }
    render() {
        var classes = classNames( this.props.className, {
            'square': true,
            'open': this.props.open,
            'marked': this.props.marked,
            'bomb': this.props.bomb
        } );


        return (
            <span onClick={this.props.onSquareClick.bind(this, this.props.x, this.props.y)} onContextMenu={this._contextClick}  className={classes}>
                {(this.props.open && this.props.numberOfBombsNear > 0 && !this.props.bomb) ? this.props.numberOfBombsNear : '\xa0'}
            </span>

        );
    }
    _contextClick(e) {
        e.preventDefault();
        this.props.onRightClick(this.props.x, this.props.y);
    }
}

module.exports = Square;