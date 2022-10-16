import { useAuthContext } from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";

const ProfileHeader = () => {
  const { auth } = useAuthContext();
  const Logout = useLogout();
  const signOut = async () => {
    await Logout();
  };

  return (
    <>
      <div className="content-header">
        <h2 className="content-header-text">Welcome, {auth.username}.</h2>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </>
  );
};
export default ProfileHeader;
