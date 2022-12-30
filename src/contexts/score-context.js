import React, { useContext } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const ScoreContext = React.createContext();

export function ScoreProvider({ children }) {
  async function setScore(uid, score, hiStreak, region, control) {
    let id = region + ":" + control + ":" + uid;
    let scoreData = await getScore(id);
    if (scoreData) {
      if (score > scoreData.score) {
        await updateScore(id, score, hiStreak);
      } else if (score === scoreData.score && hiStreak > scoreData.hi_streak) {
        await updateStreak(id, hiStreak);
      }
    } else {
      await setDoc(doc(db, "highscores", id), {
        uid: uid,
        score: score,
        hi_streak: hiStreak,
        region: region,
        control: control,
      });
    }
  }

  async function getScore(id) {
    const docRef = doc(db, "highscores", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async function updateScore(id, score, streak) {
    const scoreRef = doc(db, "highscores", id);

    await updateDoc(scoreRef, {
      score: score,
      hi_streak: streak,
    });
  }

  async function updateStreak(id, streak) {
    const scoreRef = doc(db, "highscores", id);

    await updateDoc(scoreRef, {
      hi_streak: streak,
    });
  }

  const value = {
    setScore,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

export function useScoreContext() {
  return useContext(ScoreContext);
}
