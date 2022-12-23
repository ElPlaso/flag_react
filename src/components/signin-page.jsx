import React from "react";
import { Card } from "react-bootstrap";
import { GoogleButton } from "react-google-button";
import NavBar from "./navbar";
import { useAuthContext } from "../contexts/auth-context";

export default function SignIn() {
  const { googleSignIn } = useAuthContext();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {}
  };

  return (
    <>
      <NavBar active="profile"> </NavBar>
      <div className="App" id="user">
        <Card
          className="text-secondary mt-4"
          style={{
            width: 350,
            fontSize: "18px",
            textAlign: "left",
          }}
        >
          <Card.Body style={{ alignItems: "center" }}>
            <Card.Title>Sign In.</Card.Title>
            <Card.Text>
              Please press the button below to register a Vexed account, or sign
              in to an existing one.
            </Card.Text>
            <GoogleButton
              style={{ width: "100%" }}
              type="light"
              onClick={handleGoogleSignIn}
            ></GoogleButton>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
