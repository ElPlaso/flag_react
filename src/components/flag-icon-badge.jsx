import React from "react";
import { Image } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

export default function FlagIconBadge(props) {
  return (
    <Badge bg="light" className="my-1">
      <Image
        draggable="false"
        src={
          "https://flagsapi.com/" +
          props.userFlag.toUpperCase() +
          "/SHINY/32.png"
        }
        alt={props.userFlag}
      />
    </Badge>
  );
}
