import { useState, useMemo } from 'react';
import { Square } from './Square';

export default function ReactionGrid() {
  const [score, setScore] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const gridSize = 20;

  const getRandomCoordinate = (max) => {
    return Math.floor(Math.random() * max);
  };

  const grid = useMemo(() => {
    const changeCoords = () => {
      const newX = getRandomCoordinate(gridSize);
      const newY = getRandomCoordinate(gridSize);

      setCoords({ x: newX, y: newY });
    };

    const handleCorrect = () => {
      setScore((score) => score + 1);
      changeCoords();
    };

    const handleIncorrect = () => {
      setScore((score) => score - 1);
      changeCoords();
    };

    let tempGrid = [];
    for (let i = 0; i < gridSize; i++) {
      let row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(
          <Square
            key={`${i}-${j}`}
            x={i}
            y={j}
            coords={coords}
            handleCorrect={handleCorrect}
            handleIncorrect={handleIncorrect}
          />
        );
      }
      tempGrid.push(<div key={i}>{row}</div>);
    }
    return tempGrid;
  }, [coords]);

  return (
    <div>
      <div>{score}</div>
      <div className="flex">{grid}</div>
    </div>
  );
}
