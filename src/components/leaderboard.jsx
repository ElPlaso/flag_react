import React from "react";
import { Card, Table } from "react-bootstrap";
import FlagIconBadge from "./flag-icon-badge";

export default function Leaderboard() {
  let i = 1;
  const data = [];
  return (
    <>
      <Card
        className="text-secondary mt-4 mb-5"
        style={{
          width: "90%",
          maxWidth: "500px",
          fontSize: "18px",
          textAlign: "left",
        }}
      >
        <Card.Body>
          <Card.Title>Leaderboard.</Card.Title>
          <Table responsive size="sm">
            <thead>
              <tr>
                <th>
                  <i className="bi bi-list-ol" />
                </th>
                <th>
                  <i className="bi bi-person-fill" />
                </th>
                <th>
                  <i className="bi bi-star-fill" />
                </th>
                <th>
                  <i className="bi bi-fire" />
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((leader) => {
                return (
                  <tr key={i}>
                    <td className="text-secondary">{i++}</td>
                    <td className="text-secondary">
                      {!leader.username ? "-" : leader.username}{" "}
                      {leader.flag && <FlagIconBadge userFlag={leader.flag} />}
                    </td>
                    <td className="text-secondary">{leader.score}</td>
                    <td className="text-secondary">{leader.streak}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
