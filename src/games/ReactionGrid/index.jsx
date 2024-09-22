import { Square } from './Square';

export default function ReactionGrid() {
  const gridSize = 20;

  const arr = Array.from({ length: gridSize });

  const getRandomCoordinate = (max) => {
    return Math.floor(Math.random() * max);
  };

  const x = getRandomCoordinate(gridSize);
  const y = getRandomCoordinate(gridSize);

  console.log(x);

  const row = arr.map((item, index) => {
    return <Square key={index} />;
  });

  const grid = arr.map((item, index) => {
    return <div key={index}>{row}</div>;
  });

  return <div className="flex">{grid}</div>;
}
