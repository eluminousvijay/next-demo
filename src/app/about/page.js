// About.js
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "../page.module.css";

const About = () => {
  return (
    <main className={styles.main}>
      <>
        <Header />
        <main>
          <div className={styles.intro} id="main">
            <h1>Welcome to My Creative Space</h1>
            <p>
              I'm a passionate web developer with a love for creating innovative
              solutions.
            </p>
            <button>Explore My Work</button>
          </div>
          <div className={styles.achievements}>
            <div className={styles.work}>
              <i className="fas fa-atom" />
              <p className={styles.work_heading}>Projects</p>
              <p className={styles.work_text}>
                Explore the exciting projects I've worked on. Each project is a
                story of creativity and problem-solving.
              </p>
            </div>
            <div className={styles.work}>
              <i className="fas fa-skiing" />
              <p className={styles.work_heading}>Skills</p>
              <p className={styles.work_text}>
                I possess a diverse skill set, including Vue JS, React JS, Next
                JS, Nuxt JS, Laravel, and more.
              </p>
            </div>
            <div className={styles.work}>
              <i className="fas fa-ethernet" />
              <p className={styles.work_heading}>Network</p>
              <p className={styles.work_text}>
                Networking is not just about computers; it's about building
                connections. Let's connect and grow together.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    </main>
  );
};

export default About;
