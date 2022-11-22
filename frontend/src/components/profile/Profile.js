import { useAuthContext } from "../../context/AuthProvider";
import ProfileSidebar from "./ProfileSidebar";
import DefaultModes from "./DefaultModes";
import ProfileOverview from "./ProfileOverview";
import ProfileHistory from "./ProfileHistory";
import CustomModes from "./CustomModes";
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
                path={`/${auth.username}/stats/defaultmodes`}
                element={<DefaultModes />}
              />
              <Route
                path={`/${auth.username}/stats/custommodes`}
                element={<CustomModes />}
              />
              <Route
                path={`/${auth.username}/stats/history`}
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
