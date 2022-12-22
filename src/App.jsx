import "./App.css";
import React from "react";
import Game from "./components/game";
import GameIndex from "./components/game-index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/game-context";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route exact path="/Vexed/" element={<Game />}></Route>
          <Route exact path="/Vexed/index" element={<GameIndex />}></Route>
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
