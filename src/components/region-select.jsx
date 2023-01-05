import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useGameContext } from "../contexts/game-context";

export default function RegionSelect() {
  const { updateCountries, regionRef, extraRef, gameHead, allFlags } =
    useGameContext();

  return (
    <>
      <InputGroup style={{ width: 300 }} className="mb-2">
        <InputGroup.Text>
          <i
            className={
              gameHead === "Global"
                ? "bi bi-globe-central-south-asia "
                : gameHead === "Asia" || gameHead === "Oceania"
                ? "bi bi-globe-asia-australia"
                : gameHead === "Europe" || gameHead === "Africa"
                ? "bi bi-globe-europe-africa"
                : "bi bi-globe-americas"
            }
          />
        </InputGroup.Text>
        <Form.Control
          as="select"
          onChange={updateCountries}
          ref={regionRef}
          value={gameHead}
        >
          <option value="Global">Global</option>
          <option value="Africa">Africa</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </Form.Control>
      </InputGroup>
      <InputGroup style={{ width: 300 }}>
        <InputGroup.Text id="basic-addon1">
          <i className="bi bi-asterisk" />
        </InputGroup.Text>
        <Form.Control
          as="select"
          onChange={updateCountries}
          ref={extraRef}
          value={allFlags ? "1" : "2"}
        >
          <option value="1">All flags</option>
          <option value="2">Countries only</option>
        </Form.Control>
      </InputGroup>
    </>
  );
}
