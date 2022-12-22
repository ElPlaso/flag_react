import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function Input(props) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.guessCountry(input);
      props.guessRef.current.value = null;
    }
  };

  const handleClick = (e) => {
    props.guessCountry(props.guessRef.current.value);
    props.guessRef.current.value = null;
  };

  return (
    <div>
      <div className="input">
        <input
          autoFocus
          onInput={(e) => setInput(e.target.value)}
          ref={props.guessRef}
          onKeyDown={handleKeyDown}
          type="text"
          id="form12"
          className="form-control"
        />
        <Button variant="dark" className="enter-button" onClick={handleClick}>
          <i></i>
          <i className="bi bi-check2" style={{ fontSize: 18 }}></i>
        </Button>
      </div>
    </div>
  );
}
