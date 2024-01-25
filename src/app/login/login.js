"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { loginUser, setUserToken } from "../api/backed/route";
import { useRouter } from 'next/navigation';
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../../lib/hooks";
import {
  initializeUser,
  setUserData,
} from "../../lib/features/product/productSlice";
import { setCookie } from "nookies";

const Login = ({ user }) => {
  const router = useRouter();
  // state
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(initializeUser({ userData: user ? user.userData : "" }));
    initialized.current = true;
  }
  const name = useAppSelector((state) => state.user?.userData);

  //
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
    loginUser({
      username: formData.username,
      password: formData.password,
    }).then((response) => {
      if (response.data.status === 200) {
        let data = {
          token : response.data.token,
          Login : true,
          status:200
        }
        const tokenString = JSON.stringify(data);
        const encodedToken = btoa(tokenString);
        setCookie(null, "token", encodedToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setUserToken(response.data.token);
        dispatch(setUserData(response.data));
        
        router.push("/user", { scroll: false });
      }
    });
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
              className="form-control"
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
              className="form-control"
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
