import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { gamesList } from './games/games';
import Home from './Home';
import { ReactionGrid } from './games';

function App() {
  return (
    <ReactionGrid/>
    // <Router>
    //   <Routes>
    //     <Route key="/" path="/" element={<Home />} />
    //     {gamesList.map((game) => (
    //       <Route
    //         key={game.path}
    //         path={game.path}
    //         element={<game.component />}
    //       />
    //     ))}
    //   </Routes>
    // </Router>
  );
}

export default App;
