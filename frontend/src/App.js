// routing imports
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
// importing components so we can link to them
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import PatchNotes from "./components/PatchNotes";
import Register from "./components/Register";
import RecoverAccount from "./components/RecoverAccount";
import Profile from "./components/profile/Profile";
import AuthCheck from "./components/AuthCheck";
import PersistCheck from "./components/PersistCheck";
import EmailConfirmation from "./components/EmailConfirmation";
import Footer from "./components/Footer";
import ChangePassword from "./components/ChangePassword";
import ReactGA from "react-ga4";
const TRACKING_ID = "G-6S477DPSJS";

ReactGA.initialize(TRACKING_ID);

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patchnotes" element={<PatchNotes />} />
        <Route path="/confirmation/:token" element={<EmailConfirmation />} />
        <Route path="/recover" element={<RecoverAccount />} />
        <Route path="/recover/:token" element={<ChangePassword />} />
        <Route element={<PersistCheck />}>
          <Route element={<AuthCheck />}>
            {/* protected routes */}
            <Route path="/profile/*" element={<Profile />}/>
          </Route>
        </Route>
        {/* anything that isn't one of the above */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
