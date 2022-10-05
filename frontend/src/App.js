import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./components/Login";
import { PatchNotes } from "./components/PatchNotes";
import { Profile } from "./components/Profile";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/patchnotes">Patch Notes</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patchnotes" element={<PatchNotes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
