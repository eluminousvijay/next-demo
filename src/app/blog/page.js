import React from "react";
import styles from "../page.module.css";
import Header from "../Header";
import Footer from "../Footer";
import BlogPage from "./blog";

const blogPage = () => {
  return (
    <>
      <BlogPage parentStyles={styles} />
      <Footer />
    </>
  );
};

export default blogPage;
