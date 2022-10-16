import { useAuthContext } from "../../context/AuthProvider";
import ProfileSidebar from "./ProfileSidebar";
import ProfileCharts from "./ProfileCharts";
import ProfileHeader from "./ProfileHeader";
import ProfileOverview from "./ProfileOverview";
import ProfileHistory from "./ProfileHistory";
import Home from "../Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { auth } = useAuthContext();

  return (
    <div className="flex-container">
      <ProfileSidebar></ProfileSidebar>
      <div className="content">
        <ProfileHeader />
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
    </div>
  );
};
export default Profile;
