import React, { useEffect, useState } from "react";
import { Card, Spinner, Tabs, Tab } from "react-bootstrap";
import { useScoreContext } from "../contexts/score-context";
import { useProfileContext } from "../contexts/profile-context";
import LeaderboardTable from "./leaderboard-table";

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
          region: score.region,
          control: score.control,
        });
      }
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sortBoard = (a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else {
      return b.streak - a.streak;
    }
  };

  useEffect(() => {
    fetchHighScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Card.Title>Leaderboard</Card.Title>
          <Card.Text>For time-controlled games of global flags.</Card.Text>
          {loading ? (
            <Card.Body style={{ textAlign: "center" }}>
              <Spinner />
            </Card.Body>
          ) : (
            <>
              <Tabs
                defaultActiveKey="bullet"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="bullet" title="Bullet">
                  <LeaderboardTable
                    tableData={data
                      .filter((score) => score.control === 60)
                      .sort(sortBoard)}
                  />
                </Tab>
                <Tab eventKey="blitz" title="Blitz">
                  <LeaderboardTable
                    tableData={data
                      .filter((score) => score.control === 180)
                      .sort(sortBoard)}
                  />
                </Tab>
                <Tab eventKey="casual" title="Casual">
                  <LeaderboardTable
                    tableData={data
                      .filter((score) => score.control === 300)
                      .sort(sortBoard)}
                  />
                </Tab>
              </Tabs>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
