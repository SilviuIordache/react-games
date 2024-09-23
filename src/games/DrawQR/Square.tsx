import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';

export default function Square({
  spaceIsPressed,
}: {
  spaceIsPressed: boolean;
}) {
  const [isWhite, setIsWhite] = useState(false);

  const handleClick = () => {
    if (spaceIsPressed) {
      setIsWhite(false);
    } else {
      setIsWhite(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classNames('bg-black w-8 h-8', {
        'bg-white': isWhite,
        'bg-black': !isWhite,
      })}
    ></div>
  );
}
