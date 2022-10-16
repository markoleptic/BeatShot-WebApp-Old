import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

const ProfileSidebar = () => {
  const { auth } = useAuthContext();
  return (
    <>
      <div className="profile-sidebar">
        <Link to={`/profile/${auth.username}`} className="profile-name-text">
          {auth.username}
        </Link>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/overview`}
              className="profile-sidebar-text link center-link fs-200">
              Overview
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/charts`}
              className="profile-sidebar-text link center-link fs-200">
              Charts
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/history`}
              className="profile-sidebar-text link center-link fs-200">
              History
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}`}
              className="profile-sidebar-text link center-link fs-200">
              Placeholder
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}`}
              className="profile-sidebar-text link center-link fs-200">
              Placeholder
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProfileSidebar;
