import React from "react";
import { Table } from "react-bootstrap";
import FlagIconBadge from "./flag-icon-badge";

export default function LeaderboardTable(props) {
  let i = 1;

  return (
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
        {props.tableData.map((leader) => {
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
  );
}
