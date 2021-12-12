import React, {Component} from 'react';
import './Square.css';

class Square extends Component {
    render() {
        return(
            <button className={this.props.isWin ? "square square--win" : "square"} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

export default Square;