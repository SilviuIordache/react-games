import classNames from 'classnames';

/* eslint-disable react/prop-types */
export const Square = ({ x, y, coords, handleCorrect, handleIncorrect }) => {
  const highlightSquare = x === coords.x && y === coords.y;

  if (highlightSquare) {
    console.log(highlightSquare);
  }

  const handleClick = () => {
    highlightSquare ? handleCorrect() : handleIncorrect();
  };

  return (
    <div
      className={classNames(
        'bg-gray border border-gray-500 border-b-1 w-6 h-6 hover:bg-gray-600',
        { 'bg-purple-600': highlightSquare }
      )}
      onClick={handleClick}
    ></div>
  );
};
