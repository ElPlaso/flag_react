import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useGameContext } from "../contexts/game-context";

export default function TimeSelect() {
  const { setTimeSetting } = useGameContext();

  const [timeValue, settimeValue] = useState(null);

  const times = [
    { name: "1:00", value: "1", seconds: 60 },
    { name: "3:00", value: "2", seconds: 180 },
    { name: "5:00", value: "3", seconds: 300 },
  ];

  const changeListener = (e) => {
    let val = e.currentTarget.value;
    settimeValue(val);
    setTimeSetting(times[val - 1].seconds);
  };

  return (
    <>
      <ButtonGroup style={{ width: 300 }}>
        {times.map((time, idx) => (
          <ToggleButton
            key={idx}
            id={`time-${idx}`}
            type="radio"
            variant="outline-secondary"
            name="time"
            value={time.value}
            checked={timeValue === time.value}
            onChange={changeListener}
          >
            {time.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}
