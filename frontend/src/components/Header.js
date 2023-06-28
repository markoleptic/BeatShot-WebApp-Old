import logo from "../images/logo.ico";

const Header = () => {
  return (
    <div className="header-container">
      <header>
        <div className="logo-text">
          <img className="main-logo" src={logo} alt="mainlogo" />
          <h1 className="main-text">BeatShot</h1>
        </div>
        <p>free-to-play rhythm-based aim trainer coming soon to Steam</p>
      </header>
    </div>
  );
};

export default Header;
