import mainlogo from "../images/BeatShot.ico";

const Header = () => {
  return (
    <header className="hero">
      <div className="logo-text">
        <img className="main-logo" src={mainlogo} alt="mainlogo" />
        <h1 className="main-text">BeatShot</h1>
      </div>
      <p>free-to-play rhythm-based aim trainer coming soon to Steam</p>
    </header>
  );
};

export default Header;
