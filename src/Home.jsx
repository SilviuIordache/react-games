import { useNavigate } from 'react-router-dom';
import { Card } from './components/Card';
import { gamesList } from './games/games';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {gamesList.map((game) => (
        <Card key={game.name} onClick={() => navigate(game.path)}>
          <h1 className="text-xl font-bold mb-6">{game.name}</h1>
          {game.status === 'wip' && <p className="text-gray-500">WIP</p>}
          <img src={game.image} alt={game.name} />
        </Card>
      ))}
    </div>
  );
};

export default Home;
