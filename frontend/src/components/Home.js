import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Video from "./Video";

const Home = () => {
  return (
    <>
      <div className="content">
        <div className="content-main">
          <div className="centered-bordered-container padding-1rem">
            <Video embedId="nVDfVseH24g" />
            <a
              href="https://store.steampowered.com/app/2126580/BeatShot/"
              className="link hover-blue steam-wishlist-link fw-semibold"
              referrerPolicy="strict-origin-when-cross-origin">
              Wishlist on Steam!
            </a>
          </div>
          <div className="centered-bordered-container padding-1rem">
            <p className="fs-200">
              BeatShot is rhythm-based aim-trainer that syncs targets to your
              music. Create custom game modes, view your stats, and make
              aim-training less of a chore.
            </p>
            <ul className="pn-ul-lvl1">
              <li className="pn-li-lvl1">
                <FontAwesomeIcon icon={faCrosshairs} className="pn-icon-lvl1" />
                Default Game Modes
                <ul>
                  <li className="pn-li-lvl2">
                    <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                    MultiBeat: continuously spawn targets
                  </li>
                  <li className="pn-li-lvl2">
                    <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                    SingleBeat: only one at a time
                  </li>
                  <li className="pn-li-lvl2">
                    <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                    BeatTrack: tracking one target
                  </li>
                  <li className="pn-li-lvl2">
                    <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                    BeatGrid: static grid of activating targets
                  </li>
                </ul>
              </li>
              <li className="pn-li-lvl1">
                <FontAwesomeIcon icon={faCrosshairs} className="pn-icon-lvl1" />
                Custom Game Modes
              </li>
              <ul>
                <li className="pn-li-lvl2 margin-bottom-02rem">
                  Customize your own game mode by starting from a default mode
                  template, or create one based on a previously created custom
                  mode. Customizable options include:
                </li>
                <li className="pn-li-lvl2">
                  <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                  spawn area height/width, including dynamic spawn area
                  height/width
                </li>
                <li className="pn-li-lvl2">
                  <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                  minimum and maximum size of targets, including dynamic target
                  sizing
                </li>
                <li className="pn-li-lvl2">
                  <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                  spawn beat delay
                </li>
                <li className="pn-li-lvl2">
                  <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                  max target lifespan
                </li>
                <li className="pn-li-lvl2">
                  <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                  minimum distance between targets
                </li>
                <li className="pn-li-lvl2">
                  <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                  target spawn cooldown
                </li>
                <li className="pn-li-lvl2">
                  <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                  move targets forward over their lifetime
                </li>
              </ul>
              <li className="pn-li-lvl1">
                <FontAwesomeIcon icon={faCrosshairs} className="pn-icon-lvl1" />
                Real-Time Audio Analysis
                <ul>
                  <li className="pn-li-lvl2 margin-bottom-02rem">
                    You can choose for the game to analyze an audio file or
                    listen to a specific audio device. Customize the audio
                    analysis using:
                  </li>
                  <li className="pn-li-lvl2">
                    <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                    User defined frequency band channels (e.g. 0-87 Hz for a
                    bass channel)
                  </li>
                  <li className="pn-li-lvl2">
                    <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                    threshold (sensitivity) for each band channel
                  </li>
                  <li className="pn-li-lvl2">
                    <FontAwesomeIcon icon={faPlay} className="pn-icon-lvl2" />
                    time window of the frequency sample
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
/* <img className="home-header-logo" src={logo} alt="logo"></img> */
