import React from "react";
import Login from "./login";
import styles from "../page.module.css";
import Header from "../Header";
import Footer from "../Footer";

const YourMainPage = () => {
  return (
    <main className={styles.main}>
      <Header />
      <Login />
      <Footer />
    </main>
  );
};

export default YourMainPage;
