// icons and images
import { Link } from "react-router-dom";
import logo from "../images/logo.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import useLogout from "../hooks/useLogout";

const NavBar = () => {
  const [visible, setVisibilty] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth } = useAuthContext();
  useEffect(() => {
    if (auth?.username && auth?.accessToken) {
      setLoggedIn(true);
    }
    else {setLoggedIn(false)}
  }, [visible, auth]);

  const Logout = useLogout();
  const signOut = async () => {
    await Logout();
  };

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
            {loggedIn ? (
              <button
                onClick={() => {setVisibilty(false); signOut()}}
                className="fake-button link">
                Logout
              </button>
            ) : (
              <Link
                onClick={() => setVisibilty(false)}
                className="link"
                to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
