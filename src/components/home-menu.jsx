import React from "react";
import Button from "react-bootstrap/Button";
import ModeSelect from "./mode-row";
import TimeSelect from "./time-row";
import logo from "../images/flaghead.png";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import RegionSelect from "./region-select";
import { useGameContext } from "../contexts/game-context";
import { HashLink as Link } from "react-router-hash-link";

export default function HomeMenu() {
  const { gameMode, countries, timeSetting, startgame, gameHead } =
    useGameContext();

  return (
    <>
      <div className="logo-box text-shadow">
        <img
          className="icon"
          width="100px"
          height="100px"
          draggable="false"
          src={logo}
          alt="flaghead"
        />
        <header className="welcome-header">Vexed.</header>
        <h4>The FlagReact game.</h4>
      </div>

      <Card className="mt-4">
        <Card.Body>
          <div className="mode-desc mb-2">
            {gameMode === null ? (
              <div className="text-secondary">
                Please select a game mode . . .{" "}
              </div>
            ) : (
              <div>
                Test yourself on {countries.length}{" "}
                {gameHead !== "Global" ? gameHead : "global"}
                {gameHead !== "Global" && gameHead !== "Europe"
                  ? "n "
                  : gameHead === "Europe" && "an "}{" "}
                flags
                {gameMode === "2" && <div>... with added time pressure</div>}
              </div>
            )}
          </div>

          <ModeSelect />

          {gameMode === "2" && (
            <>
              <div
                className="mt-2 mb-1 mode-desc "
                style={{ alignItems: "right" }}
              >
                {timeSetting === null ? (
                  <div className="text-secondary ">
                    Please select a time setting . . .
                  </div>
                ) : timeSetting === 60 ? (
                  <div style={{ marginRight: 205 }}>Bullet</div>
                ) : timeSetting === 180 ? (
                  <div>Blitz</div>
                ) : (
                  timeSetting === 300 && (
                    <div style={{ marginLeft: 195 }}>Casual</div>
                  )
                )}
              </div>
              <TimeSelect />
            </>
          )}

          <div className="mt-2">
            <RegionSelect />
          </div>
        </Card.Body>
        <Card.Footer>
          <Button
            style={{ width: 300, height: 50 }}
            disabled={
              (gameMode === "2" && timeSetting === null) || gameMode === null
            }
            className="start-button text-light"
            onClick={startgame}
            variant="secondary"
          >
            <i>Begin </i>
            <i className="bi bi-arrow-right"> </i>
          </Button>
        </Card.Footer>
      </Card>

      <Accordion
        flush
        data-bs-toggle="collapse"
        className="mt-2 mb-4"
        style={{ width: "90%", maxWidth: "350px" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <i>info </i>
            <i style={{ paddingLeft: 5 }} className="bi bi-info-circle"></i>
          </Accordion.Header>
          <Accordion.Body>
            <div className="text-light">General</div>
            You can guess multiple times <br></br>
            You cannot revisit a skipped flag <br></br>
            Disputed states are included<br></br>
            "All flags" includes "non-countries" <br></br>
            View valid answers{" "}
            <Link className="App-link" to="/index#top">
              here
            </Link>
            <br></br>
            <br></br>
            <div className="text-light">Time control</div>
            Answer until the time runs out <br></br>
            Points will increase with correct answers <br></br>
            Streaks will be lost on misspellings <br></br>
            <br></br>
            <div className="text-light">© El Plaso </div>
            <br></br>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
