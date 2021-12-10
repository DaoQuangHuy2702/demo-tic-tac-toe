import React, {Component} from 'react';
import './Square.css';

class Square extends Component {
    render() {
        return(
            <div className="square">
                <button onClick={this.props.onClick}>{this.props.value}</button>
            </div>
        )
    }
}

export default Square;