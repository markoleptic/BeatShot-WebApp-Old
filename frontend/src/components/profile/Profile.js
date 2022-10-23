import { useAuthContext } from "../../context/AuthProvider";
import ProfileSidebar from "./ProfileSidebar";
import ProfileCharts from "./ProfileCharts";
import ProfileOverview from "./ProfileOverview";
import ProfileHistory from "./ProfileHistory";
import { PlayerDataProvider } from "../../context/PlayerData";
import { Routes, Route } from "react-router-dom";

const Profile = () => {
  const { auth } = useAuthContext();
  return (
    <div className="flex-container">
      <PlayerDataProvider>
        <ProfileSidebar></ProfileSidebar>
        <div className="content">
          <div className="content-main">
            <Routes>
              <Route
                path={`/${auth.username}/overview`}
                element={<ProfileOverview />}
              />
              <Route
                path={`/${auth.username}/charts`}
                element={<ProfileCharts />}
              />
              <Route
                path={`/${auth.username}/history`}
                element={<ProfileHistory />}
              />
              <Route path={"/*"} element={<ProfileOverview />} />
            </Routes>
          </div>
        </div>
      </PlayerDataProvider>
    </div>
  );
};
export default Profile;