import React from "react";
import FlagView from "./flag";
import Carousel from "react-bootstrap/Carousel";
import { Card } from "react-bootstrap";

export default function MissedFlags(props) {
  const { flags } = props;
  return (
    <div>
      <Carousel variant="dark" className="mt-4 " style={{ width: 300 }}>
        {flags.map((country) => {
          return (
            <Carousel.Item key={country.code}>
              <Card
                style={{
                  justifyContent: "center",
                  height: "320px",
                  backgroundColor: "transparent",
                }}
              >
                <FlagView name={country.code} />
                <div className="text-secondary">{country.name}</div>
              </Card>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
