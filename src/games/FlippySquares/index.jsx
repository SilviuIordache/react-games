import Square from './Square';

export default function FlippySquares() {
  const columns = 20; 
  const totalSquares = columns * columns; 
  const squares = Array.from({ length: totalSquares });

  return (
    <div
      className='grid'
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {squares.map((_, index) => (
        <Square key={index} />
      ))}
    </div>
  );
}
