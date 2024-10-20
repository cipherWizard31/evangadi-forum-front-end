import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import  classes from "./Header.module.css";
import { AuthContext } from "../../App";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  console.log(window)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.hamburger} onClick={toggleMenu}>
          &#9776;
        </div>
        <div className={classes.img}>
          <Link to="/home">
            <img
              src="https://forum.ibrodev.com/assets/evangadi-logo-5fea54cc.png"
              alt="Evangadi Logo"
            />
          </Link>
        </div>
        <ul
          className={
            isOpen
              ? `${classes.nav_vertical} ${classes.show}`
              : classes.nav_horizontal
          }
        >
          <div className={classes.link}>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="">How it Works</Link>
            </li>
          </div>
          <div>
            <li>
              {user ? (
                <button onClick={handleLogout}>SIGN OUT</button>
              ) : (
                <button onClick={() => navigate("/")}>SIGN IN</button>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
