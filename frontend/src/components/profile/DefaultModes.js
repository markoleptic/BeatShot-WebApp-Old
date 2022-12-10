import { useState, useEffect, useRef } from "react";
import LineChart from "../Charts/LineChart";
import { DateTime } from "luxon";
import { useAuthContext } from "../../context/AuthProvider";
import SelectBox from "../SelectBox";
import { usePlayerDataContext } from "../../context/PlayerData";

const DefaultModes = () => {
  // Select box options
  const [gameModeOptions, setGameModeOptions] = useState([]);
  const [songOptions, setSongOptions] = useState([]);
  const [difficultyOptions, setDifficultyOptions] = useState([]);

  // Data passed to Line Chart
  const [scores, setScores] = useState();
  const [dates, setDates] = useState();

  // Best/Average Text Box values
  const [bestScore, setBestScore] = useState();
  const [bestAccuracy, setBestAccuracy] = useState();
  const [bestStreak, setBestStreak] = useState();
  const [bestCompletion, setBestCompletion] = useState();
  const [bestTimeOffset, setBestTimeOffset] = useState();
  const [avgScore, setAvgScore] = useState();
  const [avgAccuracy, setAvgAccuracy] = useState();
  const [avgStreak, setAvgStreak] = useState();
  const [avgCompletion, setAvgCompletion] = useState();
  const [avgTimeOffset, setAvgTimeOffset] = useState();

  // Tracks currently selected options from Select boxes
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  // Hooks
  const { auth } = useAuthContext();
  const errRef = useRef();
  const { data, errMsg, setErrMsg } = usePlayerDataContext();

  // clear error message when Select box option changed
  useEffect(() => {
    setErrMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameModeOptions, songOptions, difficultyOptions]);

  /* initial useEffect that gets data from PlayerDataContext
   * and populates the dates array and game mode options */
  useEffect(() => {
    try {
      let gameModeArray = [];
      for (let object in data) {
        if (
          data[object].gameModeActorName !== "Custom" &&
          data[object].customGameModeName === ""
        ) {
          /* sets the game modes options */
          if (
            !gameModeArray.some(
              (e) => e.label === data[object].gameModeActorName
            )
          ) {
            gameModeArray.push({
              value: data[object].gameModeActorName,
              label: data[object].gameModeActorName,
            });
          }
        }
      }
      if (gameModeArray.length > 1) {
        let sorted = gameModeArray.sort((a, b) => a.value.localeCompare(b.value));
        setGameModeOptions(sorted || []);
      }
      else {
        setGameModeOptions(gameModeArray || []);
      }

    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /* updates the charts and info boxes when selected gamemode or song changes */
  useEffect(() => {
    const getScores = () => {
      let scoreMap = new Map();
      for (let scoreObject in data) {
        if (
          data[scoreObject].gameModeActorName === selectedGameMode &&
          data[scoreObject].songTitle === selectedSong &&
          data[scoreObject].difficulty === selectedDifficulty
        ) {
          scoreMap.set(data[scoreObject].time, {
            score: data[scoreObject].score,
            highScore: data[scoreObject].highScore,
            accuracy: data[scoreObject].accuracy,
            streak: data[scoreObject].streak,
            difficulty: data[scoreObject].difficulty,
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
      // bests
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
          Math.min(...values.map((value) => value.timeOffset)) * 1000
        ) + " ms"
      );
      setBestStreak(Math.max(...values.map((value) => value.streak)));
      // averages
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
      setAvgStreak(
        Math.round(
          values
            .map((value) => value.streak)
            .reduce((p, c, i, a) => p + c / a.length, 0)
        )
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
  }, [selectedGameMode, selectedSong, selectedDifficulty, data]);

  useEffect(() => {
    const findMostRecentGameModeOption = (gameModeOptions) => {
      if (gameModeOptions.length === 0) {
        return;
      }
      let mostRecent = null;
      for (let object in data) {
        if (
          data[object].gameModeActorName !== "Custom" &&
          data[object].customGameModeName === "" &&
          gameModeOptions.some(
            (e) => e.value === data[object].gameModeActorName
          )
        ) {
          if (mostRecent === null) {
            mostRecent = data[object];
          } else if (
            DateTime.fromISO(mostRecent.time) <=
            DateTime.fromISO(data[object].time)
          ) {
            mostRecent = data[object];
          }
        }
      }
      if (mostRecent !== null && mostRecent.gameModeActorName !== "") {
        setSelectedGameMode(mostRecent.gameModeActorName);
      }
    };
    if (gameModeOptions.length !== 0) {
      findMostRecentGameModeOption(gameModeOptions);
    }
  }, [gameModeOptions, data]);

  useEffect(() => {
    const findMostRecentSongOption = (songOptions) => {
      let mostRecent = null;
      for (let object in data) {
        if (
          data[object].gameModeActorName !== "Custom" &&
          data[object].customGameModeName === "" &&
          songOptions.some((e) => e.value === data[object].songTitle)
        ) {
          if (mostRecent === null) {
            mostRecent = data[object];
          } else if (
            DateTime.fromISO(mostRecent.time) <=
            DateTime.fromISO(data[object].time)
          ) {
            mostRecent = data[object];
          }
        }
      }
      setSelectedSong(mostRecent.songTitle || "");
    };
    if (songOptions.length !== 0) {
      findMostRecentSongOption(songOptions);
    }
  }, [songOptions, data]);

  useEffect(() => {
    const findMostRecentDifficultyOption = (difficultyOptions) => {
      let mostRecent = null;
      for (let object in data) {
        if (
          data[object].gameModeActorName !== "Custom" &&
          data[object].customGameModeName === "" &&
          difficultyOptions.some((e) => e.value === data[object].difficulty)
        ) {
          if (mostRecent === null) {
            mostRecent = data[object];
          } else if (
            DateTime.fromISO(mostRecent.time) <=
            DateTime.fromISO(data[object].time)
          ) {
            mostRecent = data[object];
          }
        }
      }
      setSelectedDifficulty(mostRecent.difficulty || "");
    };
    if (difficultyOptions.length !== 0) {
      findMostRecentDifficultyOption(difficultyOptions);
    }
  }, [difficultyOptions, data]);

  useEffect(() => {
    /* searches for songs matching the game mode */
    const updateSongOptions = (newSelectedGameMode) => {
      let matchingSongTitles = [];
      for (let scoreObject in data) {
        if (data[scoreObject].gameModeActorName === newSelectedGameMode) {
          if (matchingSongTitles.length === 0) {
            matchingSongTitles.push({
              value: data[scoreObject].songTitle,
              label: data[scoreObject].songTitle,
            });
          } else if (
            !matchingSongTitles.some(
              (e) => e.value === data[scoreObject].songTitle
            )
          ) {
            matchingSongTitles.push({
              value: data[scoreObject].songTitle,
              label: data[scoreObject].songTitle,
            });
          }
        }
      }
      if (matchingSongTitles.length > 1) {
        let sorted = matchingSongTitles.sort((a, b) =>
          a.value.localeCompare(b.value)
        );
        setSongOptions(sorted || []);
      } else {
        setSongOptions(matchingSongTitles || []);
      }
    };
    updateSongOptions(selectedGameMode);
  }, [selectedGameMode, data]);

  useEffect(() => {
    /* searches for difficulties matching the selected song and game mode */
    const updateDifficultyOptions = (newSelectedSong) => {
      let matchingDifficulties = [];
      for (let scoreObject in data) {
        if (
          data[scoreObject].songTitle === newSelectedSong &&
          data[scoreObject].gameModeActorName === selectedGameMode
        ) {
          if (matchingDifficulties.length === 0) {
            matchingDifficulties.push({
              value: data[scoreObject].difficulty,
              label: data[scoreObject].difficulty,
            });
          } else if (
            !matchingDifficulties.some(
              (e) => e.value === data[scoreObject].difficulty
            )
          ) {
            matchingDifficulties.push({
              value: data[scoreObject].difficulty,
              label: data[scoreObject].difficulty,
            });
          }
        }
      }
      if (matchingDifficulties.length > 1) {
        let sorted = matchingDifficulties.sort((a, b) =>
          a.value.localeCompare(b.value)
        );
        setDifficultyOptions(sorted || []);
      } else {
        setDifficultyOptions(matchingDifficulties || []);
      }
    };
    updateDifficultyOptions(selectedSong);
  }, [selectedGameMode, selectedSong, data]);

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
  const streakOptions = {
    title: "Streak vs Time",
    xAxisTitle: "Date",
    yAxisTitle: "Consecutive Targets Hit",
    category: "streak",
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
        <h4 className="stats-subtitle">
          Get started by selecting a game mode or song.
        </h4>
      </div>
      <div className={errMsg ? "responsive-centered-container" : "offscreen"}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">
          {errMsg}
        </p>
      </div>
      <div className="responsive-centered-container">
        <div className="select-container">
          <div className="select-wrapper">
            <p className="select-caption fs-200">GameMode:</p>
            <div className="select-wrapper">
              <SelectBox
                id="game-mode-select"
                onChange={(value) => setSelectedGameMode(value.value)}
                placeholder={"Filter by game mode"}
                options={gameModeOptions}
                value={{ label: selectedGameMode, value: selectedGameMode }}
              />
            </div>
          </div>
          <div className="select-wrapper">
            <p className="select-caption fs-200">Song:</p>
            <div className="select-wrapper">
              <SelectBox
                id="song-select"
                onChange={(value) => setSelectedSong(value.value)}
                placeholder={"Filter by song"}
                options={songOptions}
                value={{ label: selectedSong, value: selectedSong }}
              />
            </div>
          </div>
          <div className="select-wrapper">
            <p className="select-caption fs-200">Difficulty:</p>
            <div className="select-wrapper">
              <SelectBox
                id="difficulty-select"
                onChange={(value) => setSelectedDifficulty(value.value)}
                placeholder={"Filter by Difficulty"}
                options={difficultyOptions}
                value={{ label: selectedDifficulty, value: selectedDifficulty }}
              />
            </div>
          </div>
        </div>
        <div className={"best-avg-container"}>
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
                <div className="col col-1">Streak:</div>
                <div className="col col-2">{bestStreak}</div>
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
                <div className="col col-1">Streak:</div>
                <div className="col col-2">{avgStreak}</div>
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
      <div className={"content-main"}>
        <div>
          {selectedGameMode !== "" && selectedSong !== "" ? (
            <LineChart
              labels={dates}
              data={scores.map((value) => value.score)}
              myOptions={scoreOptions}
            />
          ) : (
            <div className="empty-chart" />
          )}
        </div>
        <div>
          {selectedGameMode !== "" && selectedSong !== "" ? (
            <LineChart
              labels={dates}
              data={scores.map((value) => value.accuracy)}
              myOptions={accuracyOptions}
            />
          ) : (
            <div className="empty-chart" />
          )}
        </div>
        <div>
          {selectedGameMode !== "" && selectedSong !== "" ? (
            <LineChart
              labels={dates}
              data={scores.map((value) => value.streak)}
              myOptions={streakOptions}
            />
          ) : (
            <div className="empty-chart" />
          )}
        </div>
        <div>
          {selectedGameMode !== "" && selectedSong !== "" ? (
            <LineChart
              labels={dates}
              data={scores.map((value) => value.completion)}
              myOptions={completionOptions}
            />
          ) : (
            <div className="empty-chart" />
          )}
        </div>
        <div>
          {selectedGameMode !== "" && selectedSong !== "" ? (
            <LineChart
              labels={dates}
              data={scores.map((value) => value.timeOffset)}
              myOptions={avgTimeOffsetOptions}
            />
          ) : (
            <div className="empty-chart" />
          )}
        </div>
      </div>
    </>
  );
};
export default DefaultModes;
