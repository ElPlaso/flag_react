import "./App.css";
import React from "react";
import Game from "./components/game";
import GameIndex from "./components/game-index";
import SignIn from "./components/signin-page";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/game-context";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Game />}></Route>
          <Route exact path="/index" element={<GameIndex />}></Route>
          <Route exact path="/profile" element={<SignIn />}></Route>
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
