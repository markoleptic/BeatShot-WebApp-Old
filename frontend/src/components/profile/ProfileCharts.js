import { useState, useEffect } from "react";
import LineChart from "../Charts/LineChart";
import Select from "react-select";
import { useAuthContext } from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProfileCharts = () => {
  const [gameModeOptions, setGameModeOptions] = useState([]);
  const [songOptions, setSongOptions] = useState([]);
  const [scores, setScores] = useState();
  const [dates, setDates] = useState();
  const [chartTitle, setChartTitle] = useState("");
  const [lineChartData, setLineChartData] = useState([]);
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [scoreMap, setScoreMap] = useState(new Map());
  const axios = useAxiosPrivate();
  const { auth } = useAuthContext();

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
          //setRegMsg("No Server Response.");
        } else if (err.response.data.toString() === "not confirmed") {
          //setRegMsg("Please confirm your email or request for a resend.");
        } else if (err.response?.status === 400) {
          console.log(err.response.data.toString());
          //setRegMsg("Missing Username/Email or Password.");
        } else if (err.response?.status === 401) {
          //console.log(Object.values(err.response.data)[0].toString());
          //setRegMsg("Invalid Username, Email, or Password.");
        } else {
          //setRegMsg("Login Failed.");
        }
      }
    };
    initializeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getScores = () => {
      //let scoreMap = new Map();
      setScoreMap(new Map());
      for (let scoreObject in lineChartData) {
        if (
          lineChartData[scoreObject].gameModeActorName ===
            selectedGameMode &&
          lineChartData[scoreObject].songTitle === selectedSong
        ) {
          scoreMap.set(lineChartData[scoreObject].time, lineChartData[scoreObject].score);
          //setNSMBDates(responseData.map((x) => x.time));
        }
      }
      const sortedScoreMap = new Map([...scoreMap].sort());
      const keys = [...sortedScoreMap.keys()];
      const values = [...sortedScoreMap.values()];
      setScores(values);
      setDates(keys);
    };
    getScores();
    setChartTitle(selectedGameMode+selectedSong)
  }, [selectedGameMode, selectedSong]);

  const handleGameModeClick = () => {};

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

  return (
    <>
      <div className="select-container">
        <div className="select-wrapper">
          <h4> Select a GameMode:</h4>
          <Select
            className="game-mode-select"
            options={gameModeOptions}
            onMenuOpen={handleGameModeClick}
            onChange={(newValue) => handleGameModeSelect(newValue.value)}
            placeholder="Filter by game mode"
          />
        </div>
        <div className="select-wrapper">
          <h4> Select a Song:</h4>
          <Select
            className="song-select"
            options={songOptions}
            onChange={(newValue) => handleSongSelect(newValue.value)}
            placeholder="Filter by song"
          />
        </div>
      </div>
      <div>
        {selectedGameMode!=="" && selectedSong!=="" && (
          <LineChart labels={dates} data={scores} title={chartTitle} />
        )}
      </div>
    </>
  );
};
export default ProfileCharts;
