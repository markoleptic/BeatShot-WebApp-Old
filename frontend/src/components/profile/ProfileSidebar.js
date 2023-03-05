import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";

const ProfileSidebar = () => {
  const { auth } = useAuthContext();
  const [overviewActive, setOverViewActive] = useState(false);
  const [defaultModesActive, setDefaultModesActive] = useState(false);
  const [customModesActive, setCustomModesActive] = useState(false);
  const [historyActive, setHistoryActive] = useState(false);

  const handleOverviewClick = async (e) => {
    setOverViewActive(true);
    setDefaultModesActive(false);
    setCustomModesActive(false);
    setHistoryActive(false);
  };
  const handleDefaultModesClick = async (e) => {
    setOverViewActive(false);
    setDefaultModesActive(true);
    setCustomModesActive(false);
    setHistoryActive(false);
  };
  const handleCustomModesClick = async (e) => {
    setOverViewActive(false);
    setDefaultModesActive(false);
    setCustomModesActive(true);
    setHistoryActive(false);
  };
  const handleHistoryClick = async (e) => {
    setOverViewActive(false);
    setDefaultModesActive(false);
    setCustomModesActive(false);
    setHistoryActive(true);
  };

  return (
    <>
      <div className="profile-sidebar">
        <Link
          to={`/profile/${auth.username}`}
          className="profile-name-text link hover-white">
          {auth.username}
        </Link>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/overview`}
              className={
                overviewActive
                  ? "profile-sidebar-text-active text-center link hover-blue"
                  : "profile-sidebar-text text-center link hover-blue"
              }
              onClick={handleOverviewClick}>
              Overview
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/defaultmodes`}
              className={
                defaultModesActive
                  ? "profile-sidebar-text-active text-center link hover-blue"
                  : "profile-sidebar-text text-center link hover-blue"
              }
              color=""
              onClick={handleDefaultModesClick}>
              Default Modes
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/custommodes`}
              className={
                customModesActive
                  ? "profile-sidebar-text-active text-center link hover-blue"
                  : "profile-sidebar-text text-center link hover-blue"
              }
              onClick={handleCustomModesClick}>
              Custom Modes
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to={`/profile/${auth.username}/stats/history`}
              onClick={handleHistoryClick}
              className={
                historyActive
                  ? "profile-sidebar-text-active text-center link hover-blue"
                  : "profile-sidebar-text text-center link hover-blue"
              }>
              History
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProfileSidebar;
