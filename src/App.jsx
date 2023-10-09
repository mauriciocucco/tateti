import { useState } from "react";
import Board from "./components/Board.jsx";

const checkIfItIsADraw = (squares, winner) => {
  return !squares.includes(null) && !winner;
};

const setPosition = (history, move) => {
  const currentSquares = history[move];
  const previousSquares = history[move - 1];
  let position;

  for (let i = 0; i < currentSquares.length; i++) {
    if (currentSquares[i] !== previousSquares[i]) {
      position = i;
      break;
    }
  }

  const row = Math.floor(position / 3) + 1;
  const col = (position % 3) + 1;

  return `(fila: ${row}, columna: ${col})`;
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [isADraw, setDraw] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const moves = history.map((squares, move) => {
    let description;

    move > 0
      ? (description = `Ir al movimiento #${move} ${setPosition(
          history,
          move,
        )}`)
      : (description = "Reiniciar");

    return move !== currentMove ? (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    ) : null;
  });
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  const handlePlay = (nextSquares, winner) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setDraw(checkIfItIsADraw(nextSquares, winner));
  };

  const jumpTo = (nextMove) => {
    // setHistory(history.slice(0, nextMove + 1)); // This is if we want to delete the history after the move we are jumping to
    setCurrentMove(nextMove);
  };

  const sortMoves = () => {
    setIsAscending(!isAscending);
    setHistory([...history]);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {currentMove !== 0 && (
        <div className="game-info">
          {history.length > 3 && (
            <button onClick={sortMoves}>
              {isAscending ? "Ordenar descendente" : "Ordenar ascendente"}
            </button>
          )}
          <ul>{sortedMoves}</ul>
          {isADraw ? (
            <p className="result">{"¡Es un empate!"}</p>
          ) : (
            <p>{`Estás en el movimiento #${currentMove}`}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
