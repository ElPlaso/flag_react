import React from "react";
import Leaderboard from "./leaderboard";
import NavBar from "./navbar";

export default function Community() {
  return (
    <>
      <NavBar active="community"> </NavBar>
      <div className="App" id="user">
        <Leaderboard />
      </div>
    </>
  );
}
