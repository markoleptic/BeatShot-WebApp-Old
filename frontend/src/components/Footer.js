import logo from "../images/logo.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faSteam } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="logo-text">
        <img className="main-logo" src={logo} alt="mainlogo" />
        <h1 className="main-text">BeatShot</h1>
      </div>
      <p>free-to-play rhythm-based aim trainer coming soon to Steam</p>
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
    </footer>
  );
};

export default Footer;