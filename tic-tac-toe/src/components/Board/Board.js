import React, {Component} from 'react';
import './Board.css';
import Square from '../Square/Square';

class Board extends Component {
    renderSquare(i) {
        return(
            <Square value={this.props.squares[i]}
             isWin={(this.props.winRow != null && this.props.winRow.indexOf(i) !== -1) ? true : false} 
             onClick={() => this.props.onClick(i)}/>
        )
    }

    createBoard(row, col) {
        let board = [];
        let count = 0;
    
        for (let i = 0; i < row; i++) {
          let columns = [];
          for (let j = 0; j < col; j++) {
            columns.push(this.renderSquare(count++));
          }
          board.push(<div className="board-row">{columns}</div>);
        }
    
        return board;
    }

    render() {
        const board = this.createBoard(3, 3);
        return(
            <div className="board">
                {board}
            </div>
        )
    }
}

export default Board;
