import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

const ProfileSidebar = () => {
  const { auth } = useAuthContext();
  return (
    <div className="sidebar-container profile">
      <div className="sidebar-main">
        <NavLink
          to={`/profile/${auth.username}`}
          className="profile-name-text link hover-white">
          {auth.username}
        </NavLink>
        <ul className="sidebar">
          <li className="sidebar-item">
            <NavLink
              to={`/profile/${auth.username}`}
              end
              className={({ isActive, isPending }) =>
                "hover-blue link" +
                (isActive ? " active" : "")
              }>
              Overview
            </NavLink>
          </li>
          <li className="sidebar">
            <NavLink
              to={`/profile/${auth.username}/stats/defaultmodes`}
              className={({ isActive, isPending }) =>
                "hover-blue link" +
                (isActive ? " active" : "")
              }>
              Default Modes
            </NavLink>
          </li>
          <li className="sidebar">
            <NavLink
              to={`/profile/${auth.username}/stats/custommodes`}
              className={({ isActive, isPending }) =>
                "hover-blue link" +
                (isActive ? " active" : "")
              }>
              Custom Modes
            </NavLink>
          </li>
          <li className="sidebar">
            <NavLink
              to={`/profile/${auth.username}/stats/history`}
              className={({ isActive, isPending }) =>
                "hover-blue link" +
                (isActive ? " active" : "")
              }>
              History
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ProfileSidebar;
