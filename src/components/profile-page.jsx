import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import NavBar from "./navbar";
import { useAuthContext } from "../contexts/auth-context";

export default function Profile() {
  const { logOut, user } = useAuthContext();
  const handleSignOut = async () => {
    try {
      await logOut();
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
            <Card.Title>Hello {user?.displayName}.</Card.Title>
            <Card.Text>Welcome to your Vexed profile.</Card.Text>
            <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
              Logout
            </button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
