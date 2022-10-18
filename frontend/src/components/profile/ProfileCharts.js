import { useState, useEffect, useRef } from "react";
import LineChart from "../Charts/LineChart";
import Select from "react-select";
import { useAuthContext } from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProfileCharts = () => {
  const [gameModeOptions, setGameModeOptions] = useState([]);
  const [songOptions, setSongOptions] = useState([]);
  const [scores, setScores] = useState();
  const [dates, setDates] = useState();
  const [lineChartData, setLineChartData] = useState([]);
  const [scoreOptions, setScoreOptions] = useState();
  const [accuracyOptions, setAccuracyOptions] = useState();
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [scoreMap, setScoreMap] = useState(new Map());
  const [bestScore, setBestScore] = useState();
  const [bestAccuracy, setBestAccuracy] = useState();
  const [bestDestroyed, setBestDestroyed] = useState();
  const [bestReactionTime, setBestReactionTime] = useState();
  const [avgScore, setAvgScore] = useState();
  const [avgAccuracy, setAvgAccuracy] = useState();
  const [avgDestroyed, setAvgDestroyed] = useState();
  const [avgReactionTime, setAvgReactionTime] = useState();
  const axios = useAxiosPrivate();
  const { auth } = useAuthContext();
  const errRef = useRef();
  const [regMsg, setRegMsg] = useState("");

  // clear error message on username, password, email, or passwordMatch change
  useEffect(() => {
    setRegMsg("");
  }, [gameModeOptions, songOptions]);

  /* sets the game mode options based on get request */
  const getGameModes = (data) => {
    let gameModeArray = [];
    data.map((x) =>
      gameModeArray.push({
        value: x.gameModeActorName,
        label: x.gameModeActorName,
      })
    );
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

  /* initial useEffect that fetches player data
   * and calls functions to populate the options dropdowns */
  useEffect(() => {
    const initializeOptions = async () => {
      try {
        const response = await axios.get(
          `/api/profile/${auth.username}/getscores`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response) {
          const responseData = await response.data;
          setLineChartData(responseData);
          getGameModes(responseData);
          getSongTitles(responseData);
        }
      } catch (err) {
        if (!err?.response) {
          console.log(err.response);
          setRegMsg("No Server Response");
        } else if (err.response?.status === 400) {
          console.log(err.response.data.toString());
          setRegMsg("Unauthorized");
        } else if (err.response?.status === 401) {
          console.log(Object.values(err.response.data)[0].toString());
          setRegMsg("Couldn't retrieve data");
        } else {
          setRegMsg("Couldn't retrieve data");
        }
      }
    };
    initializeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* updates the charts and info boxes when selected gamemode or song changes */
  useEffect(() => {
    const getScores = () => {
      setScoreMap(new Map());
      for (let scoreObject in lineChartData) {
        if (
          lineChartData[scoreObject].gameModeActorName === selectedGameMode &&
          lineChartData[scoreObject].songTitle === selectedSong
        ) {
          scoreMap.set(lineChartData[scoreObject].time, {
            score: lineChartData[scoreObject].score,
            highScore: lineChartData[scoreObject].highScore,
            accuracy:
              lineChartData[scoreObject].targetsHit /
              lineChartData[scoreObject].shotsFired,
            destroyed:
              lineChartData[scoreObject].targetsHit /
              lineChartData[scoreObject].targetsSpawned,
            reactionTime: lineChartData[scoreObject].reactionTime,
          });
        }
      }
      const sortedScoreMap = new Map([...scoreMap].sort());
      const keys = [...sortedScoreMap.keys()];
      const values = [...sortedScoreMap.values()];
      setScores(values);
      setDates(keys);
      setBestScore(Math.round((Math.max(...values.map((value) => value.highScore))*10)/10));
      setBestAccuracy(
        Math.round(Math.max(...values.map((value) => value.accuracy)) * 1000)/10 + "%"
      );
      setBestDestroyed(
        Math.round(Math.max(...values.map((value) => value.destroyed)) * 1000)/10 + "%"
      );
      setBestReactionTime(
        Math.round(Math.max(...values.map((value) => value.reactionTime))*10)/10 + " ms"
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
          10 + "%"
      );
      setAvgDestroyed(
        Math.round(
          values
            .map((value) => value.destroyed)
            .reduce((p, c, i, a) => p + c / a.length, 0) * 1000
        ) /
          10 + "%"
      );
      setAvgReactionTime(
        Math.round(
          values
            .map((value) => value.reactionTime)
            .reduce((p, c, i, a) => p + c / a.length, 0)
        )
        + " ms"
      );
      setChartOptions();
    };
    getScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGameMode, selectedSong]);

  /* searches for score objects matching user selected game mode */
  const handleGameModeSelect = async (newValue) => {
    setSelectedGameMode(newValue);
    var matchingSongTitles = [];
    for (var scoreObject in lineChartData) {
      if (lineChartData[scoreObject].gameModeActorName === newValue) {
        matchingSongTitles.push({
          value: lineChartData[scoreObject].songTitle,
          label: lineChartData[scoreObject].songTitle,
        });
      }
    }
    setSongOptions(getUnique(matchingSongTitles));
  };

  /* searches for score objects matching user selected song */
  const handleSongSelect = async (newValue) => {
    setSelectedSong(newValue);
    var matchingGameModes = [];
    for (var scoreObject in lineChartData) {
      if (lineChartData[scoreObject].songTitle === newValue) {
        matchingGameModes.push({
          value: lineChartData[scoreObject].gameModeActorName,
          label: lineChartData[scoreObject].gameModeActorName,
        });
      }
    }
    setGameModeOptions(getUnique(matchingGameModes));
  };

  const selectStyles = {
    menu: (provided, state) => ({
      ...provided,
      marginTop: 0,
      fontSize: 14,
      //opacity: state.menuIsOpen ? 1 : 0,
      transition: "all 120ms ease-in-out",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "hsl(193, 81%, 58%)" : "white",
      textAlign: "left",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "hsl(193, 81%, 58%)",
        transition: "all 120ms ease-out",
      },
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state ? "hsl(193, 81%, 58%)" : "hsl(215, 91%, 9%)",
      "&:hover": {
        color: "#9ee2f5",
        transition: "all 200ms ease-out",
      },
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: state.isMenuOpen
        ? "hsl(193, 81%, 58%)"
        : "hsl(215, 91%, 9%)",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
      paddingLeft: 2,
      paddingRight: 2,
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
  };

  const setChartOptions = () => {
    setScoreOptions([
      {
        title: "Score vs Time",
        xAxisTitle: "Date",
        yAxisTitle: "Score (thousands)",
        category: "score",
        bDisplayPercentage: true,
      },
    ]);
    setAccuracyOptions([
      {
        title: "Accuracy vs Time",
        xAxisTitle: "Date",
        yAxisTitle: "Hit Rate",
        category: "accuracy",
        bDisplayPercentage: false,
      },
    ]);
  };

  return (
    <>
      <div className="stats-header">
        <h2 className="stats-title">Statistics for {auth.username}</h2>
        <h4>Get started by selecting a game mode or song.</h4>
      </div>
      <p
        ref={errRef}
        className={regMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">
        {regMsg}
      </p>
      <div className="select-best-container">
        <div className="select-container">
          <div className="select-wrapper">
            <p className="select-caption fs-200">GameMode:</p>
            <Select
              className="game-mode-select"
              options={gameModeOptions}
              onChange={(newValue) => handleGameModeSelect(newValue.value)}
              placeholder="Filter by game mode"
              styles={selectStyles}
            />
          </div>
          <div className="select-wrapper">
            <p className="select-caption fs-200">Song:</p>
            <Select
              className="song-select"
              options={songOptions}
              onChange={(newValue) => handleSongSelect(newValue.value)}
              placeholder="Filter by song"
              styles={selectStyles}
            />
          </div>
        </div>
        <div className={selectedGameMode !== "" && selectedSong !== "" ? "best-avg-container" : "hide"}>
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
                <div className="col col-2">{bestReactionTime}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Targets Destroyed:</div>
                <div className="col col-2">{bestDestroyed}</div>
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
                <div className="col col-2">{avgReactionTime}</div>
              </li>
              <li className="table-row">
                <div className="col col-1">Targets Destroyed:</div>
                <div className="col col-2">{avgDestroyed}</div>
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
    </>
  );
};
export default ProfileCharts;
