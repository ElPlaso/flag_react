import "./App.css";
import React from "react";
import Game from "./components/game";
import GameIndex from "./components/game-index";
import SignIn from "./components/signin-page";
import Profile from "./components/profile-page";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/game-context";
import { AuthProvider } from "./contexts/auth-context";
import { ProfileProvider } from "./contexts/profile-context";
import PrivateRoute from "./components/private-route";

function App() {
  return (
    <GameProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Game />}></Route>
            <Route exact path="/index" element={<GameIndex />}></Route>
            <Route exact path="/signin" element={<SignIn />}></Route>
            <Route
              exact
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileProvider>
                    <Profile />
                  </ProfileProvider>
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GameProvider>
  );
}

export default App;
