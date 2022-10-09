import { useParams } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const Logout = useLogout();
  const signOut = async () => {
    await Logout();
  };

  return (
    <>
      <h2>Only visible to those who have logged in - {id} </h2>
      <Link to={`/profile/${id}/stats`}>
        <button type="button">Stats</button>
      </Link>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};
export default Profile;
