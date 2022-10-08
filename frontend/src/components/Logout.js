import axios from "../api/axios";

const Logout = async () => {
  try {
    const response = await axios.get("/api/logout", {
      headers: { "Content-Type": "application/json"},
      withCredentials: true,
    });
    if (response) {
        console.log('Successful logout');
    }
  } catch (error) {
    console.log(error);
  }
};

export default Logout;
