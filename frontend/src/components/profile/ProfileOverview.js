import { usePlayerDataContext } from "../../context/PlayerData";
import { useState, useEffect, useRef } from "react";
import BarChart from "../Charts/BarChart";

const ProfileOverview = () => {
  const { data, errMsg, setErrMsg } = usePlayerDataContext();
  const [totalTimePlayed, setTotalTimePlayed] = useState();
  const [gameModes, setGameModes] = useState();
  const [gameModeSpecificTimePlayed, setGameModeSpecificTimePlayed] = useState(
    []
  );
  const [mostPlayedGameMode, setMostPlayedGameMode] = useState();
  const [mostPlayedGameModeHours, setMostPlayedGameModeHours] = useState();

  const errRef = useRef();
  // clear error message when Select box option changed
  useEffect(() => {
    setErrMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, gameModes]);

  // initialize data for page
  useEffect(() => {
    try {
      getTotalTimePlayed();
      getGameModes(data);
    } catch (err) {
      console.log(err.message);
      setErrMsg(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getUnique = (data) => {
    let tempArray = [];
    let unique = data.filter((element) => {
      let isDupe = tempArray.includes(element.value);
      if (!isDupe) {
        tempArray.push(element.value);
        return true;
      }
      return false;
    });
    return unique;
  };

  const getTotalTimePlayed = () => {
    let timePlayed = 0;
    for (let element in data) {
      timePlayed += data[element].songLength;
    }
    setTotalTimePlayed(Math.round((timePlayed / 60 / 60) * 100) / 100);
  };

  const getGameModes = (data) => {
    let gameModeArray = [];
    data.map((x) => {
      if (x.gameModeActorName === "Custom" && x.customGameModeName !== "") {
        return gameModeArray.push({
          value: x.customGameModeName,
          label: x.customGameModeName,
        });
      } else {
        return gameModeArray.push({
          value: x.gameModeActorName,
          label: x.gameModeActorName,
        });
      }
    });
    setGameModes(getUnique(gameModeArray));
    getMostPlayedGameModes(getUnique(gameModeArray));
  };

  const getMostPlayedGameModes = (gameModes) => {
    let playTimeMap = new Map();
    for (let gameMode in gameModes) {
      let gameModePlayTime = 0;
      for (let scoreObject in data) {
        if (
          (data[scoreObject].customGameModeName === "" &&
            data[scoreObject].gameModeActorName ===
              gameModes[gameMode].value) ||
          (data[scoreObject].customGameModeName === gameModes[gameMode].value &&
            data[scoreObject].gameModeActorName === "Custom")
        ) {
          gameModePlayTime += data[scoreObject].songLength;
        }
      }
      playTimeMap.set(gameModes[gameMode].value, gameModePlayTime);
    }
    let sortedPlayTimeMap = new Map(
      [...playTimeMap.entries()].sort((a, b) => b[1] - a[1])
    );
    setGameModeSpecificTimePlayed([...sortedPlayTimeMap.values()]);
    setGameModes([...sortedPlayTimeMap.keys()]);
    setMostPlayedGameMode([...sortedPlayTimeMap.keys()][0]);
    setMostPlayedGameModeHours(
      Math.round(([...sortedPlayTimeMap.values()][0] / 60 / 60) * 100) / 100
    );
  };

  const gameModeTimePlayedOptions = {
    title: "Most Played Game Modes",
    xAxisTitle: "Game Mode",
    yAxisTitle: "Time Played (hrs)",
    category: "timePlayed",
    bDisplayPercentage: true,
  };

  return (
    <>
      <div className={errMsg ? "responsive-centered-container" : "offscreen"}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">
          {errMsg}
        </p>
      </div>
      <div className="responsive-centered-container">
        <div>
          <ul className="best-list">
            <li className="table-header">
              <h2 className="fs-300 text-light">Most Played</h2>
            </li>
            <li className="table-row">
              <div className="col col-1">Total Time Actually Playing:</div>
              <div className="col col-2">{totalTimePlayed}&nbsp;hrs</div>
            </li>
            <li className="table-row">
              <div className="col col-1">Most Played Game Mode:</div>
              <div className="col col-2">{mostPlayedGameMode}</div>
            </li>
            <li className="table-row">
              <div className="col col-1">Time Played for Most Played:</div>
              <div className="col col-2">
                {mostPlayedGameModeHours}&nbsp;hrs
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <BarChart
          labels={gameModes}
          data={gameModeSpecificTimePlayed}
          myOptions={gameModeTimePlayedOptions}
        />
      </div>
    </>
  );
};
export default ProfileOverview;
