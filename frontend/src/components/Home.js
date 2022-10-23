import { Link } from "react-router-dom";
import logo from "../images/Beatshot_logo_header.png";

const Home = () => {
  return (
    <>
      <div className="content">
        <div className="home-header">
          <img className="home-header-logo" src={logo} alt="logo"></img>
        </div>
        <div className="content-main">
          <div className="centered-bordered-container padding-1rem">
            <div>
              <p className="fs-200 text-center">
                Welcome to the official website for Beatshot, the free-to-play
                rhythm-based aim trainer coming soon to Steam. Until then, you
                can download alpha versions on
                <a
                  className="fs-200 text-white link hover-blue "
                  href="https://github.com/markoleptic/BeatShot">
                  &nbsp;Github
                </a>
                .
              </p>
            </div>
            <p className="fs-200 text-center">
              To gain access to visual analysis for all your game modes and
              songs played,
              <Link className="link fs-200 text-white hover-blue" to={`/login`}>
                &nbsp;create an account
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
