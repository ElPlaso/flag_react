import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useScoreContext } from "../contexts/score-context";

export default function UserHighscores(props) {
  const { uid } = props;
  const { getUserHighScores } = useScoreContext();
  const [userScores, setUserScores] = useState(null);

  const loadUserScores = async () => {
    let fetched = await getUserHighScores(uid);

    let regions = [
      "global",
      "africa",
      "northamerica",
      "southamerica",
      "asia",
      "europe",
      "oceania",
    ];

    let times = [60, 180, 300];

    let userscores = [];

    for (const region of regions) {
      let regionScores = [];
      for (const time of times) {
        let regionScore = fetched.find((score) => {
          return score.region === region && score.control === time;
        });
        if (regionScore) {
          regionScores.push(regionScore.score + "-" + regionScore.hi_streak);
        } else {
          regionScores.push(" ");
        }
      }
      userscores.push(regionScores);
    }
    setUserScores(userscores);
  };

  useEffect(() => {
    loadUserScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let i = 0;

  let regionText = [
    "Global",
    "Africa",
    "North America",
    "South America",
    "Asia",
    "Europe",
    "Oceania",
  ];

  return (
    <>
      <Card
        className="text-secondary"
        style={{
          width: 350,
          fontSize: "18px",
          textAlign: "left",
        }}
      >
        <Card.Body>
          <Card.Title>Your Highscores</Card.Title>

          <Table responsive size="sm">
            <thead>
              <tr>
                <th>
                  <i className="bi bi-globe-central-south-asia text-secondary" />
                </th>
                <th>
                  <i className="bi bi-star-fill text-danger" />{" "}
                  <i className="bi bi-fire text-danger" />
                </th>
                <th>
                  <i className="bi bi-star-fill text-warning" />{" "}
                  <i className="bi bi-fire text-warning" />
                </th>
                <th>
                  <i className="bi bi-star-fill text-success" />{" "}
                  <i className="bi bi-fire text-success" />
                </th>
              </tr>
            </thead>
            {userScores && (
              <tbody>
                {userScores.map((score) => {
                  return (
                    <tr key={i}>
                      <td>{regionText[i++]}</td>
                      <td>{score[0]}</td>
                      <td>{score[1]}</td>
                      <td>{score[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
