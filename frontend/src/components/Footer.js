import logo from "../images/logo.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faSteam,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="footer-brand-container">
        <div className="footer-logo-container">
          <img className="footer-logo" src={logo} alt="logo" />
          <h2 className="footer-logo-text">BeatShot</h2>
        </div>
        <div className="footer-text-container">
          <p className="footer-description-text">the rhythm-based aim trainer</p>
        </div>
      </div>

      <ul className="footer-icon-list">
        <li className="footer-icon-item">
          <a className="footer-icon-link link hover-blue" href="https://store.steampowered.com/app/2126580/BeatShot/">
            <FontAwesomeIcon icon={faSteam} />
          </a>
        </li>
        <li className="footer-icon-item">
          <a className="footer-icon-link link hover-blue" href="https://discord.gg/FKWGbtZXmU">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </li>
        <li className="footer-icon-item">
          <a
            className="footer-icon-link link hover-blue"
            href="https://github.com/markoleptic/BeatShot">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
