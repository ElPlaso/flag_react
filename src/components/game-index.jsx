import React from "react";
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

        <div className="text-secondary">
          List of featured country/region names: <br></br>
          (valid answers are case, "the", "the republic of", "and/&",
          "saint/st", hyphen and diacritic insensitive)
        </div>

        <div className="list-of-names mt-3 mb-4 text-secondary">
          {countries.map((country) => {
            return <div key={country.code}>{country.name}</div>;
          })}
        </div>

        <div className="text-secondary">
          List of featured non-countries: <br></br> (overseas regions,
          territories, dependencies, and miscellaneous) <br></br>
        </div>

        <div className="list-of-names mt-3 mb-4 text-secondary">
          {countries
            .filter((country) => {
              return country.other === true;
            })
            .map((country) => {
              return <div key={country.code}>{country.name}</div>;
            })}
        </div>

        <div className="text-secondary">List of alternative names:</div>

        <div className="list-of-names mt-3 mb-4 text-secondary">
          {altnames.map((country) => {
            return (
              <div className="mb-3" key={country.name}>
                <div>{country.name}</div>
                <div style={{ fontSize: 10 }}>{country.alts.join(", ")}</div>
              </div>
            );
          })}
        </div>
        <div className="mb-4">
          <Link className="App-link" to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
