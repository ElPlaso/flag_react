import React from "react";

export default function FlagView(props) {
  const rightClickHandler = (e) => {
    e.preventDefault();
  };

  return (
    <img
      className={props.shake ? "shake" : undefined}
      onContextMenu={rightClickHandler}
      draggable="false"
      src={"https://flagcdn.com/w320/" + props.name + ".png"}
      alt="oops"
    />
  );
}
