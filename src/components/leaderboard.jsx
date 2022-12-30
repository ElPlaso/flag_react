import React, { useEffect, useState } from "react";
import { Card, Table, Spinner } from "react-bootstrap";
import FlagIconBadge from "./flag-icon-badge";
import { useScoreContext } from "../contexts/score-context";
import { useProfileContext } from "../contexts/profile-context";

export default function Leaderboard() {
  const { getHighScores } = useScoreContext();
  const { getProfileDetails } = useProfileContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchHighScores = async () => {
    try {
      let data = [];
      let scores = await getHighScores();

      for (const score of scores) {
        let id = score.uid;
        const profileData = await getProfileDetails(id);
        data.push({
          username: profileData.display_name,
          flag: profileData.flag_code,
          score: score.score,
          streak: score.hi_streak,
        });
      }
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHighScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let i = 1;

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
          {loading ? (
            <Card.Body style={{ textAlign: "center" }}>
              <Spinner />
            </Card.Body>
          ) : (
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
                        {leader.flag && (
                          <FlagIconBadge userFlag={leader.flag} />
                        )}
                      </td>
                      <td className="text-secondary">{leader.score}</td>
                      <td className="text-secondary">{leader.streak}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
