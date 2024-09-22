import classNames from 'classnames';

/* eslint-disable react/prop-types */
export const Square = ({ isHighlighted, handleClick }) => {
  return (
    <div
      className={classNames(
        'bg-gray border border-gray-500 border-b-1 w-6 h-6 hover:bg-gray-600',
        { 'bg-purple-600': isHighlighted }
      )}
      onClick={handleClick}
    ></div>
  );
};
