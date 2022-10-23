import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="flex-container">
        <div className="content">
          <div className="content-main">
            <div className="select-best-container">
              <div>
                <p className="fs-200">
                  Welcome to the official website for Beatshot, the free-to-play
                  rhythm-based aim trainer coming soon to Steam. Until then, you
                  can download alpha versions on
                  <a
                    className="fs-200 text-white link hover-blue"
                    href="https://github.com/markoleptic/BeatShot">
                    &nbsp;Github
                  </a>
                  .
                </p>
              </div>
              <p className="fs-200">
                To gain access to visual analysis for all your game modes and
                songs played,
                <Link
                  className="link fs-200 text-white hover-blue"
                  to={`/login`}>
                  &nbsp;create an account
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
