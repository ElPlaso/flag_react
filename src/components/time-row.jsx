import React, { useState, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useGameContext } from "../contexts/game-context";

export default function TimeSelect() {
  const { setTimeSetting, timeSetting } = useGameContext();

  const [timeValue, setTimeValue] = useState(null);

  useEffect(() => {
    switch (timeSetting) {
      case 60:
        setTimeValue("1");
        break;
      case 180:
        setTimeValue("2");
        break;
      case 300:
        setTimeValue("3");
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const times = [
    { name: "1:00", value: "1", seconds: 60 },
    { name: "3:00", value: "2", seconds: 180 },
    { name: "5:00", value: "3", seconds: 300 },
  ];

  const changeListener = (e) => {
    let val = e.currentTarget.value;
    setTimeValue(val);
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
