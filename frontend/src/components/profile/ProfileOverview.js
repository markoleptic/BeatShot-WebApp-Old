import { usePlayerDataContext } from "../../context/PlayerData";
import { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import BarChart from "../Charts/BarChart";
import Heatmap from "../Charts/HeatMap";

const maxCustomModesToShow = 4;

const ProfileOverview = () => {
  const { data, errMsg, setErrMsg } = usePlayerDataContext();
  const [totalTimePlayed, setTotalTimePlayed] = useState();
  const [timePlayedHeatmap, setTimePlayedHeatmap] = useState([]);
  const [heatmapLabels, setHeatmapLabels] = useState([]);
  const [gameModes, setGameModes] = useState();
  const [customGameModes, setCustomGameModes] = useState();
  const [gameModeSpecificTimePlayed, setGameModeSpecificTimePlayed] = useState(
    []
  );
  const [
    customGameModeSpecificTimePlayed,
    setCustomGameModeSpecificTimePlayed,
  ] = useState([]);
  const [mostPlayedGameMode, setMostPlayedGameMode] = useState();
  const [mostPlayedCustomGameMode, setMostPlayedCustomGameMode] = useState();
  const [mostPlayedGameModeHours, setMostPlayedGameModeHours] = useState();
  const [mostPlayedCustomGameModeHours, setMostPlayedCustomGameModeHours] =
    useState();
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
      //getCustomGameModes(data);
    } catch (err) {
      console.log(err.message);
      setErrMsg(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getGameModes = (data) => {
    let gameModeArray = [];
    let customGameModeArray = [];
    for (let object in data) {
      if (
        data[object].customGameModeName === "" &&
        data[object].gameModeType === "Preset"
      ) {
        if (
          !gameModeArray.some((e) => e.label === data[object].baseGameMode)
        ) {
          gameModeArray.push({
            value: data[object].baseGameMode,
            label: data[object].baseGameMode,
          });
        }
      } else {
        if (
          !customGameModeArray.some(
            (e) => e.label === data[object].customGameModeName
          )
        ) {
          customGameModeArray.push({
            value: data[object].customGameModeName,
            label: data[object].customGameModeName,
          });
        }
      }
    }
    setGameModes(gameModeArray);
    getMostPlayedGameModes(gameModeArray);
    setCustomGameModes(customGameModeArray);
    getMostPlayedCustomGameModes(customGameModeArray);
    getHeatMapData(data, generateCalendar());
  };

  const getTotalTimePlayed = () => {
    let timePlayed = 0;
    for (let element in data) {
      timePlayed += data[element].songLength;
    }
    setTotalTimePlayed(Math.round((timePlayed / 60 / 60) * 100) / 100);
  };

  const getMostPlayedGameModes = (gameModes) => {
    let playTimeMap = new Map();
    for (let gameMode in gameModes) {
      let gameModePlayTime = 0;
      // find matches for gameMode inside data
      for (let scoreObject in data) {
        if (
          data[scoreObject].gameModeType === "Preset" &&
          data[scoreObject].customGameModeName === "" &&
          data[scoreObject].baseGameMode === gameModes[gameMode].value
        ) {
          gameModePlayTime += data[scoreObject].songLength;
        }
      }
      if (gameModePlayTime !== 0) {
        playTimeMap.set(gameModes[gameMode].value, gameModePlayTime);
      }
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

  function generateCalendar() {
    const dateArr = [];
    let dt = DateTime.now().startOf('day').minus({days: 364});
    const end = DateTime.now().startOf('day')
    while (dt <= end) {
      let v = 0;
      for (let object in data) {
        if (
          dt.equals(DateTime.fromISO(data[object].time).startOf('day'))
        ) {
          v += parseInt(data[object].songLength);
        }
      }
      dateArr.push({
        x: dt.toISO(),
        y: dt.weekday,
        d: dt,
        v: v,
      });
      dt = dt.plus({day: 1})
    }
    return dateArr;
  }

  const getHeatMapData = (data, calendar) => {
    let copyCalendar = calendar;
    const labels = {
      label: [...copyCalendar.map((value) => value.x)],
      value: [...copyCalendar.map((value) => value)],
    };
    setHeatmapLabels(labels);
    setTimePlayedHeatmap(copyCalendar);
  };

  const getMostPlayedCustomGameModes = (gameModes) => {
    let customPlayTimeMap = new Map();
    for (let gameMode in gameModes) {
      let customGameModePlayTime = 0;
      // find matches for gameMode inside data
      for (let scoreObject in data) {
        if (
          data[scoreObject].gameModeType === "Custom" &&
          data[scoreObject].customGameModeName !== "" &&
          data[scoreObject].customGameModeName === gameModes[gameMode].value
        ) {
          customGameModePlayTime += data[scoreObject].songLength;
        }
      }
      if (customGameModePlayTime !== 0) {
        customPlayTimeMap.set(
          gameModes[gameMode].value,
          customGameModePlayTime
        );
      }
    }
    let sortedCustomPlayTimeMap = new Map(
      [...customPlayTimeMap.entries()].sort((a, b) => b[1] - a[1])
    );
    setCustomGameModeSpecificTimePlayed([...sortedCustomPlayTimeMap.values()].slice(0, maxCustomModesToShow));
    setCustomGameModes([...sortedCustomPlayTimeMap.keys()].slice(0, maxCustomModesToShow));
    setMostPlayedCustomGameMode([...sortedCustomPlayTimeMap.keys()][0]);
    setMostPlayedCustomGameModeHours(
      Math.round(([...sortedCustomPlayTimeMap.values()].slice(0, maxCustomModesToShow)[0] / 60 / 60) * 100) /
        100
    );
  };

  const gameModeTimePlayedOptions = {
    title: "Most Played Game Modes",
    xAxisTitle: "Game Mode",
    yAxisTitle: "Time Played (hrs)",
    category: "timePlayed",
    bDisplayPercentage: true,
  };

  const customGameModeTimePlayedOptions = {
    title: "Most Played Custom Game Modes",
    xAxisTitle: "Custom Game Mode",
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
              <h2 className="fs-300 text-light">Time Statistics</h2>
            </li>
            <li className="table-row">
              <div className="col col-1">Total Time In Game:</div>
              <div className="col col-2">{totalTimePlayed}&nbsp;hrs</div>
            </li>
            <li className="table-row">
              <div className="col col-1">Most Played Mode:</div>
              <div className="col col-2">{mostPlayedGameMode}</div>
            </li>
            <li className="table-row">
              <div className="col col-1">Time for Most Played:</div>
              <div className="col col-2">
                {mostPlayedGameModeHours}&nbsp;hrs
              </div>
            </li>
            <li className="table-row">
              <div className="col col-1">Most Played Custom Mode:</div>
              <div className="col col-2">{mostPlayedCustomGameMode}</div>
            </li>
            <li className="table-row">
              <div className="col col-1">Time Played for Custom:</div>
              <div className="col col-2">
                {mostPlayedCustomGameModeHours}&nbsp;hrs
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
      <div>
        <BarChart
          labels={customGameModes}
          data={customGameModeSpecificTimePlayed}
          myOptions={customGameModeTimePlayedOptions}
        />
      </div>
      <div>
        <Heatmap labels={heatmapLabels} data={timePlayedHeatmap} />
      </div>
    </>
  );
};
export default ProfileOverview;
