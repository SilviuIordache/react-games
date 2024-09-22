import { useState } from 'react';
import classNames from 'classnames';
export default function Square() {
  const [isWhite, setIsWhite] = useState();

  return (
    <div
      onMouseEnter={() => setIsWhite(!isWhite)}
      className={classNames('bg-black w-8 h-8', {
        'bg-white': isWhite,
        'bg-black': !isWhite,
      })}
    ></div>
  );
}
