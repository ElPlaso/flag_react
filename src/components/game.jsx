import React from "react";
import GameOver from "./game-over-screen";
import GameView from "./game-view";
import HomeMenu from "./home-menu";
import NavBar from "./navbar";
import { useGameContext } from "../contexts/game-context";

export default function Game() {
  const { gameStarted, gameOver } = useGameContext();
  return (
    <div id="home">
      {gameStarted !== true && <NavBar active="home" />}
      <div className="App center" id="play">
        {gameStarted !== true ? (
          <HomeMenu />
        ) : gameOver ? (
          <GameOver />
        ) : (
          <GameView />
        )}
      </div>
    </div>
  );
}
