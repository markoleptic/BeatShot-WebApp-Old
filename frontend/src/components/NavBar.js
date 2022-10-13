// icons and images
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import logo from "../images/logo.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const { auth } = useAuthContext();
  const [visible, setVisibilty] = useState(false);

  useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <header className="primary-header flex">
      <a href="/">
        <img className="logo" src={logo} alt="logo" />
      </a>

      <FontAwesomeIcon
        icon={faBars}
        onClick={() => setVisibilty(!visible)}
        className="mobile-nav-toggle link"
        aria-controls="primary-navigation"
        aria-expanded="false"></FontAwesomeIcon>
      <nav>
        <ul
          id="primary-navigation"
          className="primary-navigation flex fs-300"
          data-visible={visible}>
          <li className="uppercase">
            <Link
              onClick={() => setVisibilty(false)}
              className="link"
              to="/patchnotes">
              Patch Notes
            </Link>
          </li>
          <li className="uppercase">
            <Link
              onClick={() => setVisibilty(false)}
              className="link"
              to={`/profile/${auth.username}`}>
              Profile
            </Link>
          </li>
          <li className="uppercase">
            <Link
              onClick={() => setVisibilty(false)}
              className="link"
              to="/login">
              Log in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
