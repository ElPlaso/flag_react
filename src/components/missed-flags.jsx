import React from "react";
import FlagView from "./flag";
import Carousel from "react-bootstrap/Carousel";
import { Card } from "react-bootstrap";

export default function MissedFlags(props) {
  const { flags } = props;
  return (
    <Carousel variant="dark" className="mt-4 " style={{ width: 320 }}>
      {flags.map((country) => {
        return (
          <Carousel.Item key={country.code}>
            <Card
              style={{
                justifyContent: "center",
                height: country.code === "np" ? 500 : 350,
                backgroundColor: "transparent",
              }}
            >
              <FlagView className="my-2" name={country.code} />
              <Card.Text>
                <div className="text-secondary">{country.name}</div>
              </Card.Text>
            </Card>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
