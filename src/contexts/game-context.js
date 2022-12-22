import React, { useContext, useRef, useState } from "react";
import data from "../data/country-names";

const GameContext = React.createContext();

export function GameProvider({ children }) {
  const regionRef = useRef();

  const extraRef = useRef();

  const timeRef = useRef(null);

  const [countries, setCountries] = useState(data);

  const [gameHead, setGameHead] = useState("Global");

  const [allFlags, setAllFlags] = useState(true);

  const [gameStarted, setGameStarted] = useState(false);

  const [gameMode, setGameMode] = useState(null);

  const [timeSetting, setTimeSetting] = useState(null);

  const [gameOver, setGameOver] = useState(false);

  const [numCorrect, setNumCorrect] = useState(0);

  const [longestStreak, setLongestStreak] = useState(0);

  const [missedFlags, setMissedFlags] = useState([]);

  const updateCountries = () => {
    let region = regionRef.current.value;
    let gameData = data;
    if (region !== "Global") {
      gameData = data.filter((country) => {
        return country.continent === region;
      });
    }
    if (extraRef.current.value === "1") {
      setAllFlags(true);
      setCountries(gameData);
    } else {
      setAllFlags(false);
      setCountries(
        gameData.filter((country) => {
          return country.other !== true;
        })
      );
    }
    setGameHead(region);
  };

  const startgame = () => {
    setGameStarted(true);
  };

  const goHome = () => {
    restart();
    setCountries(data);
    setGameStarted(false);
    setGameOver(false);
    setGameMode(null);
    setAllFlags(true);
  };

  const restart = () => {
    clearInterval(timeRef.current);
    setLongestStreak(0);
    setGameOver(false);
    setNumCorrect(0);
    setMissedFlags([]);
    setGameHead("Global");
  };

  const value = {
    restart,
    goHome,
    startgame,
    updateCountries,
    setTimeSetting,
    setGameMode,
    setNumCorrect,
    setGameOver,
    setMissedFlags,
    setLongestStreak,
    missedFlags,
    longestStreak,
    numCorrect,
    gameOver,
    timeSetting,
    gameMode,
    gameStarted,
    allFlags,
    gameHead,
    countries,
    timeRef,
    extraRef,
    regionRef,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  return useContext(GameContext);
}
