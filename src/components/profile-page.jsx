import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import NavBar from "./navbar";
import { useAuthContext } from "../contexts/auth-context";
import FlagIconBadge from "./flag-icon-badge";

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
          }}
        >
          <Card.Header>
            <i className="bi bi-person-circle bi-10x"></i>
          </Card.Header>
          <Card.Body>
            <Card.Title>Hello {user?.displayName}.</Card.Title>
            <Card.Text>Welcome to your Vexed profile.</Card.Text>
          </Card.Body>
          <Card.Body>
            <Row>
              <Col>
                <Card.Subtitle>Display Name</Card.Subtitle>
                <Card.Text className="mt-2"> {user?.displayName}</Card.Text>
              </Col>
              <Col>
                <Card.Subtitle>Display Flag</Card.Subtitle>
                <FlagIconBadge userFlag="nz" />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-light"
              onClick={{}}
              className="py-2 px-4 m-2 text-dark"
            >
              Edit profile
            </Button>
            <Button
              variant="outline-light"
              onClick={handleSignOut}
              className="py-2 px-4 m-2 text-danger"
            >
              Sign out
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
