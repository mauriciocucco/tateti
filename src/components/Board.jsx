import Square from "./Square.jsx";
import PropTypes from "prop-types";

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
  const winnerStyle = winner
    ? {
        backgroundColor: "green",
        color: "white",
        padding: "5px",
      }
    : null;
  let status;

  winner
    ? (status = `Ganador: ${xIsNext ? "O" : "X"}`)
    : (status = `Siguiente jugador: ${xIsNext ? "X" : "O"}`);

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

    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    onPlay(nextSquares, winner);
  };

  return (
    <>
      <div className="status" style={winnerStyle}>
        {status}
      </div>
      {boardRows}
    </>
  );
};

Board.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default Board;
