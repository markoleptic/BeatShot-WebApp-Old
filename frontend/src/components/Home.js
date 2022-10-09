import LineChart from "./Charts/LineChart";
import { useState, useEffect } from "react";

const Home = () => {

    const [users, setUsers] = useState([]);
    const [id, setId] = useState([]);
    
    useEffect(() => {
        const getScores = async () => {
            try {
              const response = await fetch
              ("https://jsonplaceholder.typicode.com/users").then({})
              if (response) {
                const lineChartData = await response.json();
                setId(lineChartData.map((x)  => x.id));
                setUsers(lineChartData.map((x)  => x.name));
              }
            } catch (err) {
                console.log(err);
        }
    }
    getScores();
}, []);

    return (
        <>
        <h2>Home</h2>
        <LineChart labels={users} data={id}/>
        </>
    )
}
export default Home;