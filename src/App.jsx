import { Analytics } from '@vercel/analytics/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layouts';
import { gamesList } from './games/games';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route key="/" path="/" element={<Home />} />
        {gamesList.map((game) => (
          <Route
            key={game.path}
            path={game.path}
            element={
              <Layout>
                <game.component />
              </Layout>
            }
          />
        ))}
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
