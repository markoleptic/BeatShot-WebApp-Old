import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

const ProfileSidebar = () => {
  const { auth } = useAuthContext();
  return (
    <>
      <div className="profile-sidebar">
        <Link to={`/profile/${auth.username}`} className="profile-name-text link hover-white">
          {auth.username}
        </Link>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/overview`}
              className="profile-sidebar-text text-center link hover-blue">
              Overview
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/defaultmodes`}
              className="profile-sidebar-text text-center link hover-blue">
              Default Modes
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/custommodes`}
              className="profile-sidebar-text text-center link hover-blue">
              Custom Modes
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/history`}
              className="profile-sidebar-text text-center link hover-blue">
              History
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProfileSidebar;
