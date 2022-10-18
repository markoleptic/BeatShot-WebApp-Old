import { useAuthContext } from "../../context/AuthProvider";

const ProfileHeader = () => {
  const { auth } = useAuthContext();
  return (
    <>
      <div className="content-header">
        <h2 className="content-header-text">Welcome, {auth.username}.</h2>
      </div>
    </>
  );
};
export default ProfileHeader;
