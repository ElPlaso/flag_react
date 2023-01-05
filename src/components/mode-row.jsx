import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { useGameContext } from "../contexts/game-context";

export default function ModeSelect() {
  const { setGameMode, setTimeSetting, gameMode } = useGameContext();

  const [modeValue, setmodeValue] = useState(gameMode);

  const modes = [
    { name: "Stroll Mode", value: "1" },
    { name: "Time Control", value: "2" },
    // { name: 'Speed Run', value: '3' },
  ];

  const changeListener = (e) => {
    setmodeValue(e.currentTarget.value);
    setGameMode(e.currentTarget.value);
    setTimeSetting(null);
  };

  return (
    <>
      <ButtonGroup style={{ width: 300 }}>
        {modes.map((mode, idx) => (
          <ToggleButton
            key={idx}
            id={`mode-${idx}`}
            type="radio"
            variant="outline-secondary"
            name="mode"
            value={mode.value}
            checked={modeValue === mode.value}
            onChange={changeListener}
          >
            {mode.name + "  "}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}
