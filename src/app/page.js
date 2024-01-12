import Image from "next/image";
import styles from "./page.module.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <>
        <Header />
        <main>
          <div className={styles.intro} id="main">
            <h1>A Web Developer</h1>
            <p>I am a web developer and I love to create websites.</p>
            <button>Learn More</button>
          </div>
          <div className={styles.achievements}>
            <div className={styles.work}>
              <i className="fas fa-atom" />
              <p className={styles.work_heading}>Projects</p>
              <p className={styles.work_text}>
                I have worked on many projects and I am very proud of them. I am
                a very good developer and I am always looking for new projects.
              </p>
            </div>
            <div className={styles.work}>
              <i className="fas fa-skiing" />
              <p className={styles.work_heading}>Skills</p>
              <p className={styles.work_text}>
                I have a lot of skills like Vue JS, React JS, Next JS, Nuxt JS,
                Laravel and I am very good at them. I am very good at
                programming and I am always looking for new skills.
              </p>
            </div>
            <div className={styles.work}>
              <i className="fas fa-ethernet" />
              <p className={styles.work_heading}>Network</p>
              <p className={styles.work_text}>
                I have a lot of network skills and I am very good at them. I am
                very good at networking and I am always looking for new network
                skills.
              </p>
            </div>
          </div>
        </main>
        <Footer/>
      </>
    </main>
  );
}
