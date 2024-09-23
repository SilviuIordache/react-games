import React, { useState } from 'react';
import classNames from 'classnames';

interface Props {
  isHighlighted: boolean;
  onClick: () => void;
}

export const Square = ({ isHighlighted, onClick }: Props) => {
  const [showRed, setShowRed] = useState(false);

  const handleClick = () => {
    if (isHighlighted) handleClick();
    setShowRed(true);
  };

  return (
    <div
      className={classNames(
        'bg-gray border border-gray-500 border-b-1 w-6 h-6 hover:bg-gray-600',
        { 'bg-blue-600': isHighlighted, 'bg-red-500': showRed }
      )}
      onClick={handleClick}
    ></div>
  );
};
