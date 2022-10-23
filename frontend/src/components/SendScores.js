//import axios from "../api/axios";
//import { useAuthContext } from "../context/AuthProvider";

// haven't finished
const SendScores = async () => {
    // const { auth } = useAuthContext();
    // try {
    //     const response = await axios.post(
    //       "/api/savescores",
    //       JSON.stringify({ }),
    //       {
    //         headers: { "Content-Type": "application/json" },
    //         withCredentials: true,
    //       }
    //     );
    //     //clear the form if no errors have been caught
    //     if (response) {
    //       const accessToken = response.data?.accessToken;
    //       const responseUsername = response.data.username;
    //     }
    //   } catch (err) {
    //     if (!err?.response) {
    //       console.log(err.response);
    //     } else if (err.response.data.toString() === "not confirmed") {
    //     } else if (err.response?.status === 400) {
    //       console.log(err.response.data.toString());
    //     } else if (err.response?.status === 401) {
    //       console.log(Object.values(err.response.data)[0].toString());
    //     } else {
    //     }
    //   };
}
export default SendScores;