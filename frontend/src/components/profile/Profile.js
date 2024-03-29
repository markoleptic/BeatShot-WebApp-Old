import { useAuthContext } from "../../context/AuthProvider";
import ProfileSidebar from "./ProfileSidebar";
import DefaultModes from "./DefaultModes";
import ProfileOverview from "./ProfileOverview";
import ProfileHistory from "./ProfileHistory";
import CustomModes from "./CustomModes";
import { PlayerDataProvider } from "../../context/PlayerData";
import { Routes, Route } from "react-router-dom";
import SEO from "../SEO";

const Profile = () => {
  const { auth } = useAuthContext();
  return (
    <>
    <SEO title={`${auth.username} | BeatShot`} type={"website"} description={"the rhythm-based aim-trainer"} />
    <PlayerDataProvider>
      <div className="flex-container-row">
        <ProfileSidebar></ProfileSidebar>
        <div className="flex-container-column gap-1rem padding-1rem0">
          <Routes>
            <Route path={`/${auth.username}/overview`} element={<ProfileOverview />} />
            <Route path={`/${auth.username}/stats/defaultmodes`} element={<DefaultModes />} />
            <Route path={`/${auth.username}/stats/custommodes`} element={<CustomModes />} />
            <Route path={`/${auth.username}/stats/history`} element={<ProfileHistory />} />
            <Route path={"/*"} element={<ProfileOverview />} />
          </Routes>
        </div>
      </div>
    </PlayerDataProvider>
    </>
  );
};
export default Profile;
