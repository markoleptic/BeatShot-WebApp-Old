import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { usePlayerDataContext } from "../../context/PlayerData";

const ProfileHistory = () => {
  const { data } = usePlayerDataContext();
  const [sortedData, setSortedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let scoreMap = new Map();
    for (let scoreObject in data) {
      scoreMap.set(data[scoreObject].time, data[scoreObject]);
    }
    const sortedScoreMap = new Map([...scoreMap].sort((a, b) => a < b));
    const values = [...sortedScoreMap.values()];
    setSortedData(values);
    setIsLoaded(true);
  }, [data]);

  const getData = () => {
    return isLoaded ? sortedData : [];
  };

  const getCombined = (date, type, name, difficulty) =>  {
    return(
      <td className="combined">
      <p>{date}</p>
      <p>{(difficulty === "None") ? name : (name + " | " + difficulty)}</p>
      </td>
    )
  }

  return (
    <>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr className="tr-header">
              <th>Date & Mode</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Completion</th>
              <th>Streak</th>
              <th>Shots Fired</th>
              <th>Targets Hit</th>
              <th>Targets Spawned</th>
              <th>Avg Time Offset</th>
            </tr>
          </thead>
          <tbody>
            {getData().map((obj) => {
              return (
                <tr key={obj.scoreID}>
                  {getCombined(DateTime.fromISO(obj.time).toFormat("dd LLL yyyy") || "", 
                  obj.gameModeType || "",
                  (obj.gameModeType === "Custom" ? obj.customGameModeName : obj.baseGameMode) || "",
                  obj.difficulty || "")}
                  <td>{Math.round(obj.score) || ""}</td>
                  <td>{Math.round(obj.accuracy*100) + "%"|| ""}</td>
                  <td>{Math.round(obj.completion*100) + "%" || ""}</td>
                  <td>{obj.streak || ""}</td>
                  <td>{obj.shotsFired || ""}</td>
                  <td>{obj.targetsHit || ""}</td>
                  <td>{obj.targetsSpawned || ""}</td>
                  <td>{Math.round(obj.avgTimeOffset*1000)/1000 || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProfileHistory;
