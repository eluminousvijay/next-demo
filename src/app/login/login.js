"use client";
import React, { useState } from "react";
import styles from "../page.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <main>
      <div className={styles.intro} id="main">
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label className={styles.label} htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.input_group}>
            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className={styles.login_btn} type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
