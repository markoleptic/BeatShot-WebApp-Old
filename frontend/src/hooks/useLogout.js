import axios from "../api/axios";
import useAuth from "./useAuth";
import { useAuthContext } from "../context/AuthProvider";

const useLogout = () => {
    const { setAuth } = useAuthContext();
    const Logout = async () => {
        // clear the Auth state
        setAuth({});
        try {
          const response = await axios.get("/api/logout",
              {withCredentials: true}
          );
          if (response) {
              console.log('Successful logout');
          }
        } catch (error) {
          console.log(error);
        }
      };
    // returns the function, not a value
    return Logout;
}

export default useLogout;