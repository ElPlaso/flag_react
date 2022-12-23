import "./App.css";
import React from "react";
import Game from "./components/game";
import GameIndex from "./components/game-index";
import SignIn from "./components/signin-page";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/game-context";
import { AuthProvider } from "./contexts/auth-context";

function App() {
  return (
    <GameProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Game />}></Route>
            <Route exact path="/index" element={<GameIndex />}></Route>
            <Route exact path="/profile" element={<SignIn />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GameProvider>
  );
}

export default App;
