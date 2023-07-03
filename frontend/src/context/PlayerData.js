import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

/* when a component that subscribes to this context,
 * it will read the current context value from closest
 * Provider above it in tree */
export const PlayerDataContext = createContext({});

/* this is the consumer
 * abstract it using useContext hook */
export const usePlayerDataContext = () => useContext(PlayerDataContext);

/* this is the provider that wraps around all
 * children that should inherit the data */
export const PlayerDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const axios = useAxiosPrivate();
  const { auth } = useAuthContext();

  useEffect(() => {
    if (!auth) return;
    const initializeOptions = async () => {
      try {
        const response = await axios.get(
          `/api/profile/${auth.username}/getscores`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        /* this is where we make changes to importing from the database after adding a newly tracked category,
         * such as setting the difficulty to None so that legacy scores will still be shown in some category */
        if (response) {
          const responseData = await response.data;
          for (let scores in responseData) {
            if (responseData[scores].difficulty === "" || responseData[scores].difficulty === null) {
              responseData[scores].difficulty = "None";
            }
          }
          setData(responseData);
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response. Try Reloading the page");
        } else if (err.response?.status === 400) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Couldn't retrieve data");
        }
      }
    };
    initializeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <PlayerDataContext.Provider value={{ data, errMsg, setErrMsg }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
