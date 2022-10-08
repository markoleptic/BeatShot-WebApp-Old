import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuthContext } from "../context/AuthProvider";

const PersistCheck = () => {
  /*isLoading lets us render this page again
   *AFTER we get a new access token from useRefreshToken */
  const [isLoading, setIsLoading] = useState(true);
  // have to do this for some reason
  const refresh = useRefreshToken();
  // get current auth and persist values from nearest context
  const { auth, persist } = useAuthContext();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    // only call for an access token if we reloaded the page and need a new one
    if (!auth.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth.accessToken, persist, refresh]);

  return (
    <>
      {/* if persist is false */}
      {!persist ? (
        /* proceed to Authcheck without access token*/
        <Outlet />
      ) : /* otherwise check if isLoading is true */
      isLoading ? (
        /* print loading message */
        <p>Loading...</p>
      ) : (
        /* otherwise proceed to Authcheck with new access token */
        <Outlet />
      )}
    </>
  );
};

export default PersistCheck;
