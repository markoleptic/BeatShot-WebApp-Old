import { useState, useEffect } from "react";
import LineChart from "../Charts/LineChart";
import Select from "react-select";
import { useAuthContext } from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProfileCharts = () => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState([]);
  const [gameModeOptions, setGameModeOptions] = useState();
  const [songOptions, setSongOptions] = useState();
  const [NSMBScores, setNSMBScores] = useState();
  const [NSMBDates, setNSMBDates] = useState();
  const [gameModeSongTitle, setgameModeSongTitle] = useState("");
  const axios = useAxiosPrivate();
  const {auth} = useAuthContext();

  useEffect(() => {
    const getScores = async () => {
      try {
        const response = await axios.get(
          `/api/profile/${auth.username}/getscores`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        //clear the form if no errors have been caught
        if (response) {
          const lineChartData = await response.data;
          setgameModeSongTitle("NarrowSpreadMultiBeat - Random_15s_Song");
          for (let scoreObject in lineChartData) {
            if (lineChartData[scoreObject].gameModeActorName==="NarrowSpreadMultiBeat"
            && lineChartData[scoreObject].songTitle==="triangle_open_01-102876") {
              setNSMBScores(lineChartData.map((x) => x.score));
              setNSMBDates(lineChartData.map((x) => x.time));
            }
            console.log(lineChartData[scoreObject].highScore)
          }
          console.log(lineChartData)
          //setGameModeOptions(response.json());
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
      // try {
      //   const response = await fetch(
      //     "https://jsonplaceholder.typicode.com/users"
      //   ).then({});
      //   if (response) {
      //     const lineChartData = await response.json();
      //     setId(lineChartData.map((x) => x.id));
      //     setUsers(lineChartData.map((x) => x.name));
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    };
    getScores();
  }, []);

  return (
    <>
      <div className="rec-select">
        <div>
          <h4> #1:</h4>
          <Select options={""} className="rec-select-item" />
        </div>

        <div>
          <h4> #2:</h4>
          <Select options={""} className="rec-select-item" />
        </div>
      </div>
      <p class="text-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nostrum
        doloribus esse nam laudantium maiores molestiae, accusantium veniam
        officia nulla debitis, dolorum laboriosam adipisci consequuntur ex
        quasi? Eligendi corporis nulla ipsum in ad veniam libero quis cumque,
        quod nesciunt doloremque officia illo molestiae iste id illum. Officia
        tempore in deleniti exercitationem, quidem ducimus non molestiae
        veritatis doloremque nihil recusandae natus vitae, quasi ex itaque
        voluptate. Doloribus, deleniti vero. Consequuntur voluptates obcaecati
        aperiam nemo minima. Tempora, incidunt amet. Totam tenetur harum sequi,
        magni quos possimus ea. Nulla excepturi, quo explicabo, libero autem
        deserunt iste, consequuntur dolore asperiores quos inventore voluptas
        eius?
      </p>
      <LineChart labels={NSMBDates} data={NSMBScores} title={gameModeSongTitle} />
      <LineChart labels={users} data={id} />
      <LineChart labels={users} data={id} />
    </>
  );
};
export default ProfileCharts;
