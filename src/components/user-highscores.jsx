import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useScoreContext } from "../contexts/score-context";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";

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
        let timedScore = fetched.find((score) => {
          return score.region === region && score.control === time;
        });
        if (timedScore) {
          regionScores.push({
            score: timedScore.score,
            streak: timedScore.hi_streak,
          });
        } else {
          regionScores.push("");
        }
      }
      let untimedScore = fetched.find((score) => {
        return score.region === region && !score.control;
      });
      if (untimedScore) {
        regionScores.push({
          score: untimedScore.score,
          total: untimedScore.total,
        });
      } else {
        regionScores.push("");
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

  let iconColors = ["danger", "warning", "success", "primary"];

  let times = ["Bullet", "Blitz", "Casual", "Stroll"];

  let indexes = [0, 1, 2, 3];

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

          <Table responsive size="sm" hover>
            <thead>
              <tr>
                <th>
                  <i className="bi bi-globe-central-south-asia text-secondary" />
                </th>
                {indexes.map((i) => {
                  return (
                    <th key={i}>
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        overlay={(props) => (
                          <Tooltip {...props}>{times[i]}</Tooltip>
                        )}
                      >
                        <div>
                          <i
                            className={"bi bi-star-fill text-" + iconColors[i]}
                          />{" "}
                        </div>
                      </OverlayTrigger>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {userScores && (
              <tbody>
                {userScores.map((score) => {
                  return (
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={
                        <Popover id="popover-basic">
                          <Popover.Body>
                            {score[0].score ||
                            score[1].score ||
                            score[2].score ||
                            score[3].score
                              ? indexes.map((i) => {
                                  return (
                                    <div key={i}>
                                      {score[i].score && (
                                        <>
                                          <i
                                            className={
                                              "bi bi-star-fill text-" +
                                              iconColors[i]
                                            }
                                          />{" "}
                                          {score[i].score}{" "}
                                          {score[i].streak ? (
                                            <>
                                              <i
                                                className={
                                                  "bi bi-fire text-" +
                                                  iconColors[i]
                                                }
                                              />{" "}
                                              {score[i].streak}
                                            </>
                                          ) : (
                                            <>{"/ " + score[i].total}</>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  );
                                })
                              : "no scores"}
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <tr key={i}>
                        <td>{regionText[i++]}</td>
                        <td>{score[0].score}</td>
                        <td>{score[1].score}</td>
                        <td>{score[2].score}</td>
                        <td>{score[3].score}</td>
                      </tr>
                    </OverlayTrigger>
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
