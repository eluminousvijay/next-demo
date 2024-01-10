import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>&copy; 2024 Developer</div>
      <div className={styles.bottom_links}>
        <div className={styles.links}>
          {/* <span>Social Links</span> */}
          <Link href="#">
            <i className="fab fa-facebook" />
          </Link>
          <Link href="#">
            <i className="fab fa-twitter" />
          </Link>
          <Link href="#">
            <i className="fab fa-instagram" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
