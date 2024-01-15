"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
import {
  initializeUser,
  setUserData,
} from "../lib/features/product/productSlice";

const Header = ({data, user}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [userData, setUserData] = useState(data);

  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(initializeUser({ userData: user ? user.userData : "" }));
    initialized.current = true;
  }

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
    setShowMenu(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(setUserData(''));
  };

  return (
    <header className={styles.header}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Developer</title>
      <style dangerouslySetInnerHTML={{ __html: styles.toString() }} />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <a href="#" className={styles.logo}>
        Developer
      </a>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <i className={`fas ${showMenu ? "fa-times" : "fa-bars"}`} />
      </div>
      {!userData ? (
        <nav
          className={`${styles["nav-items"]} ${showMenu ? styles.show : ""}`}
        >
          <Link
            href="/"
            className={currentPath === "/" ? styles.selected : ""}
            onClick={() => handleNavItemClick("home")}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={currentPath === "/about" ? styles.selected : ""}
            onClick={() => handleNavItemClick("about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={currentPath === "/contact" ? styles.selected : ""}
            onClick={() => handleNavItemClick("contact")}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className={currentPath === "/login" ? styles.selected : ""}
            onClick={() => handleNavItemClick("login")}
          >
            Login
          </Link>
        </nav>
      ) : (
        <nav
          className={`${styles["nav-items"]} ${showMenu ? styles.show : ""}`}
        >
          <Link
            href="/user"
            className={currentPath === "/user" ? styles.selected : ""}
            onClick={() => handleNavItemClick("user")}
          >
            Users
          </Link>
          <Link
            href=""
            onClick={() => handleLogOut()}
          >
            Logout
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
