// icons and images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faSteam } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links-left">
        <li className="nav-item-left">
          <Link className="text-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item-left">
          <Link className="text-link" to="/patchnotes">
            Patch Notes
          </Link>
        </li>
      </ul>
      <div className="nav-right">
        <ul className="nav-links-right">
          <li className="nav-item-right">
            <Link className="text-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item-right">
            <Link className="text-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item-right">
            <Link className="text-link" to="/profile">
              Profile
            </Link>
          </li>
        </ul>

        <ul className="icon-links">
          <li className="icon-item">
            <a className="icon-link-item" href="https://www.steam.com">
              <FontAwesomeIcon icon={faSteam} />
            </a>
          </li>
          <li className="icon-item">
            <a className="icon-link-item" href="https://www.discord.gg">
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
