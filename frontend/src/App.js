// routing imports
import { Route, Routes } from "react-router-dom";

// importing components so we can link to them
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import PatchNotes from "./components/PatchNotes";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AuthCheck from "./components/AuthCheck";
import Logout from "./components/Logout";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patchnotes" element={<PatchNotes />} />

        <Route element={<PersistLogin />}>
          <Route element={<AuthCheck />}>
            {/* protected routes */}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/logout" element={<Logout />} />
          </Route>
        </Route>
        {/* anything that isn't one of the above */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
