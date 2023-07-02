// icons and images
import { NavLink } from "react-router-dom";
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
    } else {
      setLoggedIn(false);
    }
  }, [visible, auth]);

  const Logout = useLogout();
  const signOut = async () => {
    await Logout();
  };

  return (
    <div className="header-container">
    <header className="primary-header flex">
      <a className="link" href="/">
        <img className="logo" src={logo} alt="logo" />
      </a>

      <FontAwesomeIcon
        icon={faBars}
        onClick={() => setVisibilty(!visible)}
        className="mobile-nav-toggle link blue-hover"
        aria-controls="primary-navigation"
        aria-expanded="false"></FontAwesomeIcon>
      <nav>
        <ul
          id="primary-navigation"
          className="primary-navigation flex fs-300"
          data-visible={visible}>
          <li className="uppercase">
            <NavLink
              className={({ isActive, isPending }) =>
                "hover-blue link" + (isActive ? " active" : "")
              }
              to="/devblog"
              onClick={() => setVisibilty(false)}>
              Dev Blog
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink
              className={({ isActive, isPending }) =>
                "hover-blue link" + (isActive ? " active" : "")
              }
              to="/patchnotes"
              onClick={() => setVisibilty(false)}>
              Patch Notes
            </NavLink>
          </li>
          <li className="uppercase">
            <NavLink
              to={`/profile/${auth.username}`}
              className={({ isActive, isPending }) =>
                "text-white hover-blue link" + (isActive ? " active" : "")
              }
              onClick={() => setVisibilty(false)}>
              Profile
            </NavLink>
          </li>
          <li className="uppercase">
            {loggedIn ? (
              <button
                className="fake-button link text-white hover-blue"
                onClick={() => {
                  setVisibilty(false);
                  signOut();
                }}>
                Logout
              </button>
            ) : (
              <NavLink
                className="fake-button link text-white hover-blue"
                to="/login"
                onClick={() => setVisibilty(false)}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
    </div>
  );
};

export default NavBar;
