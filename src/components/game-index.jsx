import React from "react";
import Card from "react-bootstrap/Card";
import countries from "../data/country-names";
import altnames from "../data/name-alts";
import { HashLink as Link } from "react-router-hash-link";

export default function GameIndex() {
  return (
    <div className="App">
      <div style={{ fontSize: 15 }}>
        <div className="text-shadow">
          <header className="welcome-header">Index.</header>
        </div>

        <Card bg="dark" className="text-secondary mt-4 list-card">
          <Card.Header>Featured country/region names</Card.Header>
          <Card.Body>
            <Card.Text>
              Valid answers are case, "the", "the republic of", "and/&",
              "saint/st", hyphen and diacritic insensitive.
            </Card.Text>
            <div className="list-of-names mt-3 mb-4 text-secondary">
              {countries.map((country) => {
                return <div key={country.code}>{country.name}</div>;
              })}
            </div>
          </Card.Body>
        </Card>

        <Card bg="dark" className="text-secondary mt-4 list-card">
          <Card.Header>Non-countries</Card.Header>
          <Card.Body>
            <Card.Text>
              Overseas regions, territories, dependencies, and miscellaneous.
            </Card.Text>
            <div className="list-of-names mt-3 mb-4 text-secondary">
              {countries
                .filter((country) => {
                  return country.other === true;
                })
                .map((country) => {
                  return <div key={country.code}>{country.name}</div>;
                })}
            </div>
          </Card.Body>
        </Card>

        <Card bg="dark" className="text-secondary mt-4 mb-4 list-card">
          <Card.Header>Alternative names/spellings</Card.Header>
          <Card.Body>
            <div className="list-of-names mt-3 mb-4 text-secondary">
              {altnames.map((country) => {
                return (
                  <div className="mb-3" key={country.name}>
                    <div>{country.name}</div>
                    <div style={{ fontSize: 10 }}>
                      {country.alts.join(", ")}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>

        <div className="mb-4">
          <Link className="App-link" to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
