import Square from "./Square.jsx";
import PropTypes from "prop-types";

Board.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPlay: PropTypes.func.isRequired,
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [true, lines[i]];
    }
  }
  return [false, null];
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const [winner, winnerLine] = calculateWinner(squares);
  const squaresList = squares.map((square, i) => {
    const isWinnerSquare = winnerLine && winnerLine.includes(i);

    return (
      <Square
        key={i}
        value={square}
        isWinnerSquare={isWinnerSquare}
        onSquareClick={() => handleClick(i)}
      />
    );
  });
  const boardRows = [];
  let status;

  winner
    ? (status = `Winner: ${winner}`)
    : (status = `Next player: ${xIsNext ? "X" : "O"}`);

  for (let i = 0; i < squares.length; i += 3) {
    boardRows.push(
      <div className="board-row" key={i}>
        {squaresList.slice(i, i + 3)}
      </div>,
    );
  }

  const handleClick = (i) => {
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
};

export default Board;
