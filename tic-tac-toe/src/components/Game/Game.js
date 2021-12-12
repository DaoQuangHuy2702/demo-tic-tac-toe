import React, {Component} from 'react';
import './Game.css';
import Board from '../Board/Board';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    currentIndex: null
                }
            ],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    currentIndex: i
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 === 0)
        })
    }

    reverseStep() {
        this.setState({
            history: this.state.history.reverse()
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = step.currentIndex != null ? `Go to move #${move} in cell[${Math.floor(step.currentIndex / 3)}, ${step.currentIndex % 3}]` : 'Go to game start';
            if(move === history.length - 1) {
                return <li key={move}><button style={{backgroundColor: "lightblue"}} onClick={() => this.jumpTo(move)}>{desc}</button></li>
            }
            return <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
        })

        let status;
        if(winner) {
            status = `Winner is ${winner.winSquares}`;
        }else {
            if(current.squares.indexOf(null) === -1) {
                status = 'Draw';
            }
            else {
                status = `Next player is: ${this.state.xIsNext ? 'X' : 'O'}`;
            }
        }

        return(
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} winRow={winner ? winner.winRow : null} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <button onClick={() => this.reverseStep()}>Reverse Step</button>
                </div>
            </div>
        )
    }
} 

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            const winner = {
                winSquares: squares[a],
                winRow: lines[i]
            }
            return winner;
        }
    }
    
    return null;
}

export default Game;