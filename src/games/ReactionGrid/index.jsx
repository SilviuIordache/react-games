import { useState, useMemo } from 'react';
import { Square } from './Square';

export default function ReactionGrid() {
  const [score, setScore] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const gridSize = 20;

  const grid = useMemo(() => {
    const getRandomCoordinate = (max) => {
      return Math.floor(Math.random() * max);
    };

    const changeCoords = () => {
      const newX = getRandomCoordinate(gridSize);
      const newY = getRandomCoordinate(gridSize);

      setCoords({ x: newX, y: newY });
    };

    const handleClick = (isCorrect) => {
      setScore((score) => score + (isCorrect ? 1 : -1));
      changeCoords();
    };

    let tempGrid = [];
    for (let i = 0; i < gridSize; i++) {
      let row = [];
      for (let j = 0; j < gridSize; j++) {
        const isHighlighted = i === coords.x && j === coords.y;
        row.push(
          <Square
            key={`${i}-${j}`}
            isHighlighted={isHighlighted}
            handleClick={() => handleClick(isHighlighted)}
          />
        );
      }
      tempGrid.push(<div key={i}>{row}</div>);
    }
    return tempGrid;
  }, [coords.x, coords.y]);

  return (
    <div>
      <div className='text-3xl'>{score}</div>
      <div className="flex">{grid}</div>;
    </div>
  );
}
