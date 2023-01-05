import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import logo from "../images/finish-flag.png";
import MissedFlags from "./missed-flags";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useGameContext } from "../contexts/game-context";
import { useAuthContext } from "../contexts/auth-context";
import { useScoreContext } from "../contexts/score-context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { setScore } = useScoreContext();

  const [viewMissed, setViewMissed] = useState(false);

  const toggleView = () => {
    setViewMissed(!viewMissed);
  };

  useEffect(() => {
    async function setHighScore() {
      if (gameMode === "2") {
        if (user) {
          try {
            let region = gameHead.replace(/\s+/g, "").toLowerCase();
            let success = await setScore(
              user.uid,
              numCorrect,
              longestStreak,
              region,
              timeSetting
            );
            if (success) {
              toast.success(
                "New personal best for " +
                  gameHead +
                  "-" +
                  (timeSetting === 60
                    ? "Bullet"
                    : timeSetting === 180
                    ? "Blitz"
                    : "Casual "),
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                }
              );
              if (region === "global") {
                toast.success("Score on public leaderboard!", {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                });
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    setHighScore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {viewMissed === true ? (
        <MissedFlags toggleView={toggleView} flags={missedFlags} />
      ) : (
        <>
          <Card
            bg="dark"
            className="text-secondary mt-4 mb-5"
            style={{
              width: "90%",
              maxWidth: "500px",
              fontSize: "18px",
            }}
          >
            <Card.Header>
              <div
                className="btn-toolbar"
                style={{ justifyContent: "space-around" }}
              >
                <Button
                  variant="link"
                  className="play-button link-secondary text-decoration-none"
                  onClick={restart}
                >
                  <i className="bi bi-reply" style={{ fontSize: 20 }}>
                    {" "}
                    Play again
                  </i>
                </Button>
                <Button
                  variant="link"
                  className="link-secondary text-decoration-none"
                  onClick={goHome}
                >
                  <i style={{ fontSize: 20 }}>Go home </i>
                  <i className="bi bi-house" style={{ fontSize: 20 }}></i>
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <img
                className="game-flag"
                width="70px"
                draggable="false"
                src={logo}
                alt="flag"
              />
              <header className="game-over">Game Over</header>
            </Card.Body>
            <Card.Body>
              {gameMode === "2" ? (
                <Container className="mt-2 " style={{ width: "70%" }}>
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
            </Card.Body>
            <Card.Body>
              <Row>
                <Button
                  variant="link"
                  className="link-secondary text-decoration-none"
                  onClick={() => navigate("/profile")}
                >
                  Your highscores
                </Button>
                <Button
                  variant="link"
                  className="link-secondary text-decoration-none"
                  onClick={() => navigate("/community")}
                >
                  Public leaderboard
                </Button>
              </Row>
            </Card.Body>
          </Card>
          {missedFlags.length > 0 && (
            <div className="mb-5 text-muted">
              <div style={{ fontSize: 17 }}>Flags you skipped</div>
              <MissedFlags flags={missedFlags} />
            </div>
          )}
        </>
      )}
    </>
  );
}
