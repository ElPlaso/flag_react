import React from "react";
import FlagView from "./flag";
import Button from "react-bootstrap/Button";
import Input from "./input";
import Timer from "./timer";
import altnames from "../data/name-alts";
import { useState, useRef } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useGameContext } from "../contexts/game-context";

export default function GameView() {
  const {
    countries,
    timeSetting,
    numCorrect,
    longestStreak,
    gameHead,
    allFlags,
    setLongestStreak,
    gameMode,
    setNumCorrect,
    missedFlags,
    setMissedFlags,
    setGameOver,
    goHome,
  } = useGameContext();

  const guessRef = useRef();

  const [timeLeft, setTimeLeft] = useState(timeSetting);

  const [incorrect, setIncorrect] = useState(false);

  const [skipped, setSkipped] = useState(false);

  const [prevCountry, setPrevCountry] = useState(null);

  const [currentStreak, setCurrentStreak] = useState(0);

  const [displayFire, setDisplayFire] = useState(false);

  const [displayWind, setDisplayWind] = useState(false);

  const [visited, setVisited] = useState([]);

  const getRandomCountry = () => {
    let rand = Math.floor(Math.random() * countries.length);
    while (true) {
      if (visited.includes(rand)) {
        rand = Math.floor(Math.random() * countries.length);
      } else {
        let newVisited = visited;
        newVisited.push(rand);
        setVisited(newVisited);
        let country = countries[rand];
        return country;
      }
    }
  };

  const [country, setCountry] = useState(getRandomCountry);

  const updateCountry = () => {
    if (visited.length - 1 === countries.length - 1) {
      setGameOver(true);
    } else {
      setCountry(getRandomCountry);
    }
  };

  const guessCountry = (input) => {
    let answer = country.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // check for multiple iterations

    answer = answer.toUpperCase().replace("THE ", "");
    let guess = input.toUpperCase().replace("THE ", "");

    guess = guess.trim();
    answer = answer.replace("SAINT", "ST");
    guess = guess.replace("SAINT", "ST");

    answer = answer.replace("-", " ");
    guess = guess.replace("-", " ");

    answer = answer.replace(" AND ", " & ");
    guess = guess.replace(" AND ", " & ");

    if (answer.slice(0, 11) === "REPUBLIC OF") {
      answer = answer.replace("REPUBLIC OF ", "");
      guess = guess.replace("REPUBLIC OF ", "");
    }

    if (isCorrect(guess, answer)) {
      correct();
    } else {
      setCurrentStreak(0);
      setIncorrect(true);
      setTimeout(() => setIncorrect(false), 350);
      if (currentStreak > 0) {
        setDisplayWind(true);
        setTimeout(() => setDisplayWind(false), 350);
      }
    }
  };

  const isCorrect = (guess, answer) => {
    if (guess === answer) {
      return true;
    }

    return altnames.some((country) => {
      if (answer === country.name) {
        if (country.alts.includes(guess)) {
          return true;
        }
      }
      return false;
    });
  };

  const correct = () => {
    updateCountry();
    setNumCorrect(numCorrect + 1);
    let streak = currentStreak + 1;

    if (streak >= longestStreak) {
      setLongestStreak(streak);
      setDisplayFire(true);
      setTimeout(() => setDisplayFire(false), 500);
    }

    setCurrentStreak(streak);
  };

  const handleSkip = (e) => {
    let newMissed = missedFlags;
    newMissed.push(country);
    setMissedFlags(newMissed);

    if (currentStreak > 0) {
      setDisplayWind(true);
      setTimeout(() => setDisplayWind(false), 350);
    }

    setCurrentStreak(0);
    guessRef.current.value = null;
    setPrevCountry(country.name);
    setSkipped(true);
    setTimeout(() => setSkipped(false), 500);
    updateCountry();
  };

  const timeout = () => {
    setTimeLeft(timeSetting);
    setGameOver(true);
  };

  return (
    <>
      <Modal className="custom-modal" centered size="sm" show={skipped}>
        <Modal.Body>{prevCountry}</Modal.Body>
      </Modal>

      <div className="welcome-header text-shadow" style={{ fontSize: 22 }}>
        {gameHead}.
      </div>
      <div className="text-secondary text-shadow mb-3" style={{ fontSize: 18 }}>
        {allFlags !== true && "Countries only"}
      </div>

      <div className="top-row">
        <Button
          variant="link"
          className="link-secondary text-decoration-none"
          onClick={goHome}
        >
          <i className="bi bi-house" style={{ fontSize: 18 }}></i>
        </Button>
        {gameMode === "2" ? (
          <div className="timer">
            <Timer setTimeLeft={setTimeLeft} timeout={timeout} />
          </div>
        ) : (
          <>
            <div
              id="score-count"
              className={
                visited.length - 1 > 99
                  ? "triple"
                  : visited.length - 1 > 9
                  ? "double"
                  : "single"
              }
            >
              {numCorrect} / {visited.length - 1}
            </div>
          </>
        )}

        <Button
          variant="link"
          className="skip-button link-secondary text-decoration-none"
          onClick={handleSkip}
        >
          <i className="bi bi-fast-forward" style={{ fontSize: 18 }}>
            {" "}
            Skip
          </i>
        </Button>
      </div>

      <div className="box-shadow">
        <FlagView name={country.code} shake={incorrect} />
      </div>

      <div className="input-row mt-2">
        <Input
          guessRef={guessRef}
          guessCountry={guessCountry}
          updateCountry={updateCountry}
        />

        {gameMode === "2" && timeSetting !== null && (
          <div className="prog-bar">
            <ProgressBar
              variant="dark"
              animated
              now={(timeLeft / timeSetting) * 100}
            />
          </div>
        )}
      </div>

      {gameMode === "2" && timeSetting !== null && (
        <Container className="mt-4 " style={{ width: "300px" }}>
          <Row>
            <Col className="text-muted">
              <div className="text-light">{numCorrect}</div>
              Score
            </Col>
            <Col className="text-muted">
              <div className="text-light">
                {displayWind === true ? (
                  <i className="bi bi-wind"></i>
                ) : displayFire === true ? (
                  <i className="bi bi-fire"></i>
                ) : (
                  currentStreak
                )}
              </div>
              Streak
            </Col>
          </Row>
        </Container>
      )}
      <div className="mb-5"></div>
    </>
  );
}
