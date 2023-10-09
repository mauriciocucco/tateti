import { useState } from "react";
import Board from "./components/Board.jsx";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const moves = history.map((squares, move) => {
    let description;

    move > 0
      ? (description = `Go to move #${move}`)
      : (description = "Go to game start");

    return move !== currentMove ? (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    ) : null;
  });
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const sortMoves = () => {
    setIsAscending(!isAscending);
    setHistory([...history]);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          currentMove={currentMove}
          onPlay={handlePlay}
        />
      </div>
      {currentMove !== 0 && (
        <div className="game-info">
          <button onClick={sortMoves}>
            {isAscending ? "Sort descending" : "Sort ascending"}
          </button>
          <ol>{sortedMoves}</ol>
          <p>{`You are at move #${currentMove}`}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
