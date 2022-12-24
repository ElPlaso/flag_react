import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import NavBar from "./navbar";
import { useAuthContext } from "../contexts/auth-context";
import FlagIconBadge from "./flag-icon-badge";
import { Typeahead } from "react-bootstrap-typeahead";
import data from "../data/country-names";

export default function Profile() {
  const { logOut, user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [userFlag, setUserFlag] = useState(null);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {}
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUserFlag(null);
  };

  const handleOnEdit = () => {
    setEditMode(!editMode);
  };

  const onClearFlag = () => {
    setUserFlag(null);
  };

  return (
    <>
      <NavBar active="profile"> </NavBar>
      <div className="App" id="user">
        {editMode !== true ? (
          <Card
            className="text-secondary mt-4"
            style={{
              width: 350,
              fontSize: "18px",
            }}
          >
            <Card.Header>
              <i className="bi bi-person-circle" />
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
                onClick={toggleEditMode}
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
        ) : (
          <Card
            className="text-secondary mt-4"
            style={{
              width: 350,
              fontSize: "18px",
              textAlign: "left",
            }}
          >
            <Card.Header className="text-center">Edit Profile</Card.Header>
            <Card.Body>
              <Card.Text>Display Name</Card.Text>
              <input
                style={{
                  borderColor: "#6c757d",
                  backgroundColor: "transparent",
                }}
                type="text"
                className="form-control mb-4"
                placeholder="Enter a new name..."
              />
              <Card.Text>
                Display Flag{" "}
                {userFlag ? (
                  <>
                    <FlagIconBadge userFlag={userFlag} />
                  </>
                ) : (
                  <i className="bi bi-flag"></i>
                )}
              </Card.Text>
              <Typeahead
                dropup
                id="typeahead"
                placeholder="Where are you from?..."
                inputProps={{
                  style: {
                    borderColor: "#6c757d",
                    backgroundColor: "transparent",
                  },
                }}
                onChange={(selected) => {
                  const country = data.find((country) => {
                    return country.name === selected[0];
                  });
                  if (country) {
                    setUserFlag(country.code);
                  }
                }}
                options={data.map((country) => {
                  return country.name;
                })}
              >
                {({ onClear, selected }) => (
                  <div className="rbt-aux">
                    {!!selected.length && (
                      <Button
                        variant="link"
                        className="text-secondary"
                        onClick={() => {
                          onClear();
                          onClearFlag();
                        }}
                      >
                        Clear Flag
                      </Button>
                    )}
                  </div>
                )}
              </Typeahead>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button
                variant="outline-light"
                className=" px-4 m-2 text-success"
                onClick={handleOnEdit}
              >
                <i>Done</i>
                <i className="bi bi-check" style={{ fontSize: 21 }} />
              </Button>
              <Button
                variant="outline-light"
                className=" px-4 m-2 text-danger"
                onClick={toggleEditMode}
              >
                <i>Cancel</i>
                <i className="bi bi-x" style={{ fontSize: 21 }} />
              </Button>
            </Card.Footer>
          </Card>
        )}
      </div>
    </>
  );
}
