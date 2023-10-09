import PropTypes from "prop-types";

Square.propTypes = {
  value: PropTypes.string.isRequired,
  isWinnerSquare: PropTypes.bool.isRequired,
  onSquareClick: PropTypes.func.isRequired,
};

const Square = ({ value, isWinnerSquare, onSquareClick }) => {
  const buttonStyle = isWinnerSquare ? { border: "2px solid red" } : null;

  return (
    <button style={buttonStyle} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
