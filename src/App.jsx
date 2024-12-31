import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { gamesList } from './games/games';
import Home from './Home';
import Layout from './components/Layouts';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    // <TypeFast />
    // <ReactionGrid />
    // <FlippySquares/>
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
