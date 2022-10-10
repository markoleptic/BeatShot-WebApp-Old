import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { auth } = useAuthContext();
  const Logout = useLogout();
  const signOut = async () => {
    await Logout();
  };

  return (
    <>
    <div className="profile">
      <h2>Welcome, {auth.username}. Only visible to those who have logged in.</h2>
      <Link to={`/profile/${auth.username}/stats`}>
        <button className="sign-out" type="button">Stats</button>
      </Link>
      <button className="sign-out" type="button" onClick={signOut}>Sign Out</button>
      </div>
    </>
  );
};
export default Profile;
