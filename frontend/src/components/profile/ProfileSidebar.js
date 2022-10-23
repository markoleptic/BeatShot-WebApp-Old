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
              to={`/profile/${auth.username}/overview`}
              className="profile-sidebar-text text-center link hover-blue">
              Overview
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/charts`}
              className="profile-sidebar-text text-center link hover-blue">
              Charts
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/history`}
              className="profile-sidebar-text text-center link hover-blue">
              Placeholder
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}`}
              className="profile-sidebar-text text-center link hover-blue">
              Placeholder
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}`}
              className="profile-sidebar-text text-center link hover-blue">
              Placeholder
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProfileSidebar;
