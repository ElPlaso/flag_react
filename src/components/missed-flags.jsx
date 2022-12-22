import React from "react";
import FlagView from "./flag";
import Carousel from "react-bootstrap/Carousel";

export default function MissedFlags(props) {
  const { flags } = props;
  return (
    <div>
      <Carousel variant="dark" className="mt-4 ">
        {flags.map((country) => {
          return (
            <Carousel.Item key={country.code}>
              <FlagView name={country.code} />
              <div className="text-secondary">{country.name}</div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
