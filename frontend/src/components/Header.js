import logo from "../images/logo.ico";

const Header = () => {
  return (
    <header className="hero flex">
      <div className="logo-text">
        <img className="main-logo" src={logo} alt="mainlogo" />
        <h1 className="main-text">BeatShot</h1>
      </div>
      <p>free-to-play rhythm-based aim trainer coming soon to Steam</p>
    </header>
  );
};

export default Header;
