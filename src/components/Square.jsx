import PropTypes from "prop-types";

const Square = ({ value, isWinnerSquare, onSquareClick }) => {
  const buttonStyle = isWinnerSquare ? { border: "2px solid red" } : null;

  return (
    <button style={buttonStyle} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  isWinnerSquare: PropTypes.bool,
  onSquareClick: PropTypes.func.isRequired,
};

export default Square;
