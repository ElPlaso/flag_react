import React from "react";
import Button from "react-bootstrap/Button";
import ModeSelect from "./mode-row";
import TimeSelect from "./time-row";
import logo from "../images/flaghead.png";
import Accordion from "react-bootstrap/Accordion";
import RegionSelect from "./region-select";
import { useGameContext } from "../contexts/game-context";

export default function HomeMenu() {
  const { gameMode, countries, timeSetting, startgame } = useGameContext();

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
      </div>

      <div className="mode-desc mb-2">
        {gameMode === null ? (
          <div className="text-secondary">Please select a game mode . . . </div>
        ) : gameMode === "1" ? (
          <div>Test yourself on {countries.length} flags</div>
        ) : (
          gameMode === "2" && <div>Added time pressure</div>
        )}
      </div>

      <ModeSelect />

      {gameMode === "2" && (
        <>
          <div className="mt-2 mb-1 mode-desc " style={{ alignItems: "right" }}>
            {timeSetting === null ? (
              <div className="text-secondary ">
                Please select a time mode . . .
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

      <div className={"mt-2"}>
        {(gameMode === "2" && timeSetting !== null) || gameMode === "1" ? (
          <Button
            style={{ width: 300, height: 50 }}
            className="start-button text-light"
            onClick={startgame}
            variant="light"
          >
            <i>Begin </i>
            <i className="bi bi-arrow-right"> </i>
          </Button>
        ) : (
          <Button
            style={{ width: 300, height: 50 }}
            disabled
            className="start-button text-light"
            variant="light"
          >
            <i>Begin </i>
            <i className="bi bi-arrow-right"> </i>
          </Button>
        )}
      </div>

      <Accordion
        flush
        data-bs-toggle="collapse"
        className="mt-2"
        style={{ width: 300 }}
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
            "All flags" includes flags of non-soverign states and more <br></br>
            View featured country/region names
            <a
              href="/Vexed/index"
              className="App-link"
              style={{ marginLeft: 5 }}
            >
              here
            </a>
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
