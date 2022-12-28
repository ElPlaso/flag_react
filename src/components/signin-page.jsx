import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { GoogleButton } from "react-google-button";
import NavBar from "./navbar";
import { useAuthContext } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { googleSignIn, user } = useAuthContext();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {}
  };

  useEffect(() => {
    if (user != null) {
      navigate("/profile");
    }
  }, [user, navigate]);

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
