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
    <PlayerDataProvider>
      <div className="flex-container-row">
        <ProfileSidebar></ProfileSidebar>
        <div className="content">
          <div className="content-main">
          <p className="text-light" id="cum2">
                  I had to figure out a way to keep track of where a target has
                  spawned recently along with the total area that it occupied.
                  Target spawn locations are chosen from a two-dimensional
                  rectangle whose dimensions are the Horizontal/Vertical Spread
                  (custom game mode options). These dimensions correspond to the
                  actual size in Unreal units, and when maxed out represent 3.2
                  million individual points. Iterating through that many points
                  isn't even an option, so the total two-dimensional spawn
                  rectangle is broken into the smaller rectangles, where each
                  one is represented by a USpawnArea.
                </p>
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
        </div>
      </PlayerDataProvider>
  );
};
export default Profile;
