import React from "react";
import { Image } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

export default function FlagIconBadge(props) {
  return (
    <Badge bg="light" className="my-1">
      <Image
        draggable="false"
        src={
          "https://www.countryflagicons.com/SHINY/32/" +
          props.userFlag.toUpperCase() +
          ".png"
        }
        alt={props.userFlag}
      />
    </Badge>
  );
}
