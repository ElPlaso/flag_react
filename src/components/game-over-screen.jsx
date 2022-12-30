import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import logo from "../images/flag.png";
import MissedFlags from "./missed-flags";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlagView from "./flag";
import { useGameContext } from "../contexts/game-context";
import { useAuthContext } from "../contexts/auth-context";
import { useScoreContext } from "../contexts/score-context";

export default function GameOver() {
  const {
    missedFlags,
    gameMode,
    numCorrect,
    longestStreak,
    countries,
    restart,
    goHome,
    timeSetting,
    gameHead,
  } = useGameContext();

  const { user } = useAuthContext();
  const { setScore } = useScoreContext();

  const [viewMissed, setViewMissed] = useState(false);

  const toggleView = () => {
    setViewMissed(!viewMissed);
  };

  useEffect(() => {
    if (gameMode === "2") {
      if (user) {
        try {
          let region = gameHead.replace(/\s+/g, "").toLowerCase();
          setScore(user.uid, numCorrect, longestStreak, region, timeSetting);
        } catch (error) {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {viewMissed === true ? (
        <MissedFlags toggleView={toggleView} flags={missedFlags} />
      ) : (
        <>
          <img
            className="game-flag"
            width="10%"
            height="10%"
            draggable="false"
            src={logo}
            alt="flag"
          />
          <header className="game-over">Game Over</header>
          {gameMode === "2" ? (
            <Container className="mt-4 " style={{ width: "300px" }}>
              <Row>
                <Col className="text-muted">
                  <div className="text-light">{numCorrect}</div>
                  Score
                </Col>
                <Col className="text-muted">
                  <div className="text-light">{longestStreak}</div>
                  Best Streak
                </Col>
              </Row>
            </Container>
          ) : (
            <div className="final-score">
              {numCorrect} / {countries.length}
            </div>
          )}
          {missedFlags.length === 1 ? (
            <>
              <div className="text-light mt-4 mb-2">You skipped one flag: </div>
              <FlagView name={missedFlags[0].code} />
              <div className="text-secondary">{missedFlags[0].name}</div>{" "}
            </>
          ) : (
            missedFlags.length > 0 && (
              <>
                <div className="text-light mt-4">Flags you skipped: </div>
                <MissedFlags toggleView={toggleView} flags={missedFlags} />
              </>
            )
          )}
          <Button
            variant="link"
            className="play-button link-light text-decoration-none mt-2"
            onClick={restart}
          >
            <i className="bi bi-reply" style={{ fontSize: 22 }}>
              {" "}
              Play again
            </i>
          </Button>
          <Button
            variant="link"
            className="link-light text-decoration-none mb-5"
            onClick={goHome}
          >
            <i className="bi bi-house" style={{ fontSize: 22 }}>
              {" "}
              Go home
            </i>
          </Button>
        </>
      )}
    </>
  );
}
