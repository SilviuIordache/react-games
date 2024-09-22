import { useNavigate } from 'react-router-dom';
import { Card } from './components/Card';
import { gamesList } from './games/games';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-4">
      {gamesList.map((game) => (
        <Card key={game.name} onClick={() => navigate(game.path)}>
          <h1 className="text-xl font-bold">{game.name}</h1>
        </Card>
      ))}
    </div>
  );
};

export default Home;
