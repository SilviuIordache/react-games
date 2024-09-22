import { useNavigate } from 'react-router-dom';
import { Card } from './components/Card';
import { gamesList } from './games/games';
import { useState, useEffect, useCallback, useMemo } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const deadline = useMemo(() => new Date('2024-10-20'), []);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = deadline - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [deadline]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <>
      <div className="mb-4">
        <h1 className="text-3xl font-bold ">
          Games: {gamesList.length} / 30
        </h1>
        <p>
          Deadline: {timeLeft.days}D, {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {gamesList.map((game) => (
          <Card key={game.name} onClick={() => navigate(game.path)}>
            <h1 className="text-xl font-bold">{game.name}</h1>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
