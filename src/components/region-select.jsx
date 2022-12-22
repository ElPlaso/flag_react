import React from "react";
import Form from "react-bootstrap/Form";
import { useGameContext } from "../contexts/game-context";

export default function RegionSelect() {
  const { updateCountries, regionRef, extraRef } = useGameContext();

  return (
    <>
      <Form.Control
        as="select"
        onChange={updateCountries}
        ref={regionRef}
        style={{
          width: "300px",
          backgroundColor: "#282c34",
          borderColor: "gray",
          color: "gray",
        }}
      >
        <option value="Global">Global</option>
        <option value="Africa">Africa</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </Form.Control>

      <Form.Control
        as="select"
        onChange={updateCountries}
        ref={extraRef}
        style={{
          width: "300px",
          backgroundColor: "#282c34",
          borderColor: "gray",
          color: "gray",
          marginTop: 5,
        }}
      >
        <option value="1">All flags</option>
        <option value="2">Countries only</option>
      </Form.Control>
    </>
  );
}
