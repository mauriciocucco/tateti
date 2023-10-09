const Square = ({ value, isWinnerSquare, onSquareClick }) => {
  const buttonStyle = isWinnerSquare ? { border: "2px solid red" } : null;

  return (
    <button style={buttonStyle} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
