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
import PersistCheck from "./components/PersistCheck";
import Stats from "./components/Stats";

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

        <Route element={<PersistCheck />}>
          <Route element={<AuthCheck />}>
            {/* protected routes */}
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/:id/stats" element={<Stats />} />
          </Route>
        </Route>
        {/* anything that isn't one of the above */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
