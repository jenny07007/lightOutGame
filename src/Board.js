import React, { Component } from "react";
import Cell from "./Cell";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartOn: 0.3
  };

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() };
  }

  flipCellsAround = coords => {
    let { nrows, ncols } = this.props;
    let board = this.state.board;
    let [y, x] = coords.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // filp init cell
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board, hasWon });
  };

  createBoard = () => {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartOn);
      }
      board.push(row);
    }
    return board;
  };

  generateTbBoard = () => {
    let tbBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        const coords = `${y}-${x}`;
        row.push(
          <Cell
            key={coords}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coords)}
          />
        );
      }
      tbBoard.push(<tr key={y}>{row}</tr>);
    }
    return tbBoard;
  };

  handleShuffle = () => {
    const board = this.createBoard();
    this.setState({ board });
    const newTbBoard = this.generateTbBoard();
    return <tbody>{newTbBoard}</tbody>;
  };

  renderWinner = () => {
    return this.state.hasWon ? (
      <h1>
        You Won
        <span role="img" aria-label="winner">
          🎉
        </span>
      </h1>
    ) : (
      <>
        <h2>
          L<span>i</span>ght O<span>u</span>t
        </h2>
        <table>
          <tbody>{this.generateTbBoard()}</tbody>
        </table>
        <div className="btn-container ">
          <button onClick={this.handleShuffle}>SHUFFLE ALL</button>
        </div>
      </>
    );
  };

  render() {
    return <div className="board">{this.renderWinner()}</div>;
  }
}

export default Board;
