import { useState, useEffect, useRef } from "react";
import LineChart from "../Charts/LineChart";
import { useAuthContext } from "../../context/AuthProvider";
import SelectBox from "../SelectBox";
import { usePlayerDataContext } from "../../context/PlayerData";

const ProfileCharts = () => {
  // Select box options
  const [gameModeOptions, setGameModeOptions] = useState([]);
  const [songOptions, setSongOptions] = useState([]);

  // Data passed to Line Chart
  const [scores, setScores] = useState();
  const [dates, setDates] = useState();

  // Best/Average Text Box values
  const [bestScore, setBestScore] = useState();
  const [bestAccuracy, setBestAccuracy] = useState();
  const [bestCompletion, setBestCompletion] = useState();
  const [bestTimeOffset, setBestTimeOffset] = useState();
  const [avgScore, setAvgScore] = useState();
  const [avgAccuracy, setAvgAccuracy] = useState();
  const [avgCompletion, setAvgCompletion] = useState();
  const [avgTimeOffset, setAvgTimeOffset] = useState();

  // Tracks currently selected options from Select boxes
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedSong, setSelectedSong] = useState("");

  // Hooks
  const { auth } = useAuthContext();
  const errRef = useRef();
  const { data, errMsg, setErrMsg } = usePlayerDataContext();

  // clear error message when Select box option changed
  useEffect(() => {
    setErrMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameModeOptions, songOptions]);

  /* initial useEffect that gets data from PlayerDataContext
   * and calls functions to populate the options dropdowns */
  useEffect(() => {
    try {
      getGameModes(data);
      getSongTitles(data);
    } catch (err) {
      console.log(err.message);
      setErrMsg(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /* sets the game mode options based on get request */
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
    setGameModeOptions(getUnique(gameModeArray));
  };

  /* sets the song options based on get request */
  const getSongTitles = (data) => {
    let songTitleArray = [];
    data.map((x) =>
      songTitleArray.push({
        value: x.songTitle,
        label: x.songTitle,
      })
    );
    setSongOptions(getUnique(songTitleArray));
  };

  /* returns a unique array so duplicates aren't displayed in dropdowns */
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

  /* updates the charts and info boxes when selected gamemode or song changes */
  useEffect(() => {
    const getScores = () => {
      let scoreMap = new Map();
      for (let scoreObject in data) {
        if (
          ((data[scoreObject].customGameModeName === "" &&
            data[scoreObject].gameModeActorName === selectedGameMode) ||
            (data[scoreObject].customGameModeName === selectedGameMode &&
              data[scoreObject].gameModeActorName === "Custom")) &&
          data[scoreObject].songTitle === selectedSong
        ) {
          scoreMap.set(data[scoreObject].time, {
            score: data[scoreObject].score,
            highScore: data[scoreObject].highScore,
            accuracy: data[scoreObject].accuracy,
            completion: data[scoreObject].completion,
            timeOffset: data[scoreObject].avgTimeOffset,
          });
        }
      }
      const sortedScoreMap = new Map([...scoreMap].sort());
      const keys = [...sortedScoreMap.keys()];
      const values = [...sortedScoreMap.values()];
      setScores(values);
      setDates(keys);
      setBestScore(
        Math.round(
          (Math.max(...values.map((value) => value.highScore)) * 10) / 10
        )
      );
      setBestAccuracy(
        Math.round(Math.max(...values.map((value) => value.accuracy)) * 1000) /
          10 +
          "%"
      );
      setBestCompletion(
        Math.round(
          Math.max(...values.map((value) => value.completion)) * 1000
        ) /
          10 +
          "%"
      );
      setBestTimeOffset(
        Math.round(
          Math.max(...values.map((value) => value.timeOffset)) * 1000
        ) + " ms"
      );
      setAvgScore(
        Math.round(
          values
            .map((value) => value.score)
            .reduce((p, c, i, a) => p + c / a.length, 0)
        )
      );
      setAvgAccuracy(
        Math.round(
          values
            .map((value) => value.accuracy)
            .reduce((p, c, i, a) => p + c / a.length, 0) * 1000
        ) /
          10 +
          "%"
      );
      setAvgCompletion(
        Math.round(
          values
            .map((value) => value.completion)
            .reduce((p, c, i, a) => p + c / a.length, 0) * 1000
        ) /
          10 +
          "%"
      );
      setAvgTimeOffset(
        Math.round(
          values
            .map((value) => value.timeOffset)
            .reduce((p, c, i, a) => p + c / a.length, 0) * 1000
        ) + " ms"
      );
    };
    getScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGameMode, selectedSong]);

  /* searches for score objects matching user selected game mode */
  const handleGameModeSelect = async (newValue) => {
    setSelectedGameMode(newValue);
    var matchingSongTitles = [];
    for (var scoreObject in data) {
      if (
        data[scoreObject].gameModeActorName === newValue ||
        data[scoreObject].customGameModeName === newValue
      ) {
        matchingSongTitles.push({
          value: data[scoreObject].songTitle,
          label: data[scoreObject].songTitle,
        });
      }
    }
    setSongOptions(getUnique(matchingSongTitles));
  };

  /* searches for score objects matching user selected song */
  const handleSongSelect = async (newValue) => {
    setSelectedSong(newValue);
    var matchingGameModes = [];
    for (var scoreObject in data) {
      if (data[scoreObject].songTitle === newValue) {
        if (matchingGameModes.gameModeActorName === "") {
          matchingGameModes.push({
            value: data[scoreObject].customGameModeName,
            label: data[scoreObject].customGameModeName,
          });
        } else {
          matchingGameModes.push({
            value: data[scoreObject].gameModeActorName,
            label: data[scoreObject].gameModeActorName,
          });
        }
      }
    }
    setGameModeOptions(getUnique(matchingGameModes));
  };

  const scoreOptions = {
    title: "Score vs Time",
    xAxisTitle: "Date",
    yAxisTitle: "Score (thousands)",
    category: "score",
    bDisplayPercentage: true,
  };
  const accuracyOptions = {
    title: "Accuracy vs Time",
    xAxisTitle: "Date",
    yAxisTitle: "Hit Rate (%)",
    category: "accuracy",
    bDisplayPercentage: false,
  };
  const completionOptions = {
    title: "Average Targets Destroyed",
    xAxisTitle: "Date",
    yAxisTitle: "Completion (%)",
    category: "completion",
    bDisplayPercentage: false,
  };
  const avgTimeOffsetOptions = {
    title: "Average Reaction Time",
    xAxisTitle: "Date",
    yAxisTitle: "Time (ms)",
    category: "avgTimeOffset",
    bDisplayPercentage: false,
  };

  return (
    <>
      <div className="stats-header">
        <h2 className="stats-title">Statistics for {auth.username}</h2>
        <h4>Get started by selecting a game mode or song.</h4>
      </div>
      <div className={errMsg ? "select-best-container" : "offscreen"}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">
          {errMsg}
        </p>
      </div>
      <div className="select-best-container">
        <div className="select-container">
          <div className="select-wrapper">
            <p className="select-caption fs-200">GameMode:</p>
            <div className="select-wrapper">
              <SelectBox
                onChange={(newValue) => handleGameModeSelect(newValue.value)}
                placeholder={"Filter by game mode"}
                options={gameModeOptions}
              />
            </div>
          </div>
          <div className="select-wrapper">
            <p className="select-caption fs-200">Song:</p>
            <div className="select-wrapper">
              <SelectBox
                onChange={(newValue) => handleSongSelect(newValue.value)}
                placeholder={"Filter by song"}
                options={songOptions}
              />
            </div>
          </div>
        </div>
        <div
          className={
            selectedGameMode !== "" && selectedSong !== ""
              ? "best-avg-container"
              : "hide"
          }>
          <div className="best-container">
            <ul className="best-list">
              <li className="table-header">
                <h2 className="fs-300 text-light">Best</h2>
              </li>
              <li className="table-row">
                <div className="col col-1">Score:</div>
                <div className="col col-2">{bestScore}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Accuracy:</div>
                <div className="col col-2">{bestAccuracy}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Reaction Time:</div>
                <div className="col col-2">{bestTimeOffset}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Targets Destroyed:</div>
                <div className="col col-2">{bestCompletion}</div>
              </li>
            </ul>
          </div>
          <div className="best-container">
            <ul className="best-list">
              <li className="table-header">
                <h2 className="fs-300 text-light">Average</h2>
              </li>
              <li className="table-row">
                <div className="col col-1">Score:</div>
                <div className="col col-2">{avgScore}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Accuracy:</div>
                <div className="col col-2">{avgAccuracy}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Reaction Time:</div>
                <div className="col col-2">{avgTimeOffset}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Targets Destroyed:</div>
                <div className="col col-2">{avgCompletion}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        {selectedGameMode !== "" && selectedSong !== "" && (
          <LineChart
            labels={dates}
            data={scores.map((value) => value.score)}
            myOptions={scoreOptions}
          />
        )}
      </div>
      <div>
        {selectedGameMode !== "" && selectedSong !== "" && (
          <LineChart
            labels={dates}
            data={scores.map((value) => value.accuracy)}
            myOptions={accuracyOptions}
          />
        )}
      </div>
      <div>
        {selectedGameMode !== "" && selectedSong !== "" && (
          <LineChart
            labels={dates}
            data={scores.map((value) => value.completion)}
            myOptions={completionOptions}
          />
        )}
      </div>
      <div>
        {selectedGameMode !== "" && selectedSong !== "" && (
          <LineChart
            labels={dates}
            data={scores.map((value) => value.timeOffset)}
            myOptions={avgTimeOffsetOptions}
          />
        )}
      </div>
    </>
  );
};
export default ProfileCharts;
