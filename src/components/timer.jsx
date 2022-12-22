import React, { useState, useEffect } from "react";
import { useGameContext } from "../contexts/game-context";

export default function Timer(props) {
  const { timeSetting, timeRef } = useGameContext();

  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    props.setTimeLeft(total / 1000);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total > 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
    if (total === 0) {
      clearInterval(timeRef.current);
      props.timeout();
    }
  };

  const clearTimer = (e) => {
    switch (timeSetting) {
      case 60:
        setTimer("01:00");
        break;
      case 180:
        setTimer("03:00");
        break;
      default:
        setTimer("05:00");
    }

    if (timeRef.current) clearInterval(timeRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    timeRef.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + timeSetting);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{timer}</div>;
}
