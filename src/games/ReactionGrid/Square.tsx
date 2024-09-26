import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

interface Props {
  isHighlighted: boolean;
  onClick: () => void;
}

export const Square = ({ isHighlighted, onClick }: Props) => {
  const [showRed, setShowRed] = useState(false);

  const handleClick = () => {
    onClick();
    if (!isHighlighted) {
      setShowRed(true);
    }
  };

  useEffect(() => {
    if (showRed) {
      const timer = setTimeout(() => {
        setShowRed(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [showRed]);

  return (
    <div
      className={classNames(
        'border border-gray-500 border-b-1 w-6 h-6 hover:bg-gray-600',
        {
          'bg-blue-600': isHighlighted,
          'hover:bg-red-500 bg-red-500': showRed,
        }
      )}
      onClick={handleClick}
    ></div>
  );
};
