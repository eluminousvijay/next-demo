"use client";
import React, { useState } from "react";
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../../lib/hooks";
import {
  initializeUser,
  setUserData,
} from "../../lib/features/product/productSlice";
import styles from "./page.module.css";
import { useEffect } from "react";
import Image from "next/image";
import { getUser, setUserToken } from "../api/backed/route";
import Header from "../Header";
import Footer from "../Footer";

const UserList = ({ data }) => {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(initializeUser({ userData: data ? data.userData : "" }));
    initialized.current = true;
  }
  const userInfo = useAppSelector((state) => state.data?.userData);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setUserToken(userInfo.access_token);
    GetData();
  }, []);

  const GetData = () => {
    getUser({ search_input: "" }).then((response) => {
      console.log(">>>>response>>>", response);
      if (response.status === "success") {
        let userData = response.data;
        setUserData(userData);
      }
    });
  };
  const [users, setUsers] = useState();

  const handleEdit = (userId) => {
    // Implement edit functionality
    console.log(`Edit user with ID ${userId}`);
  };

  const handleDelete = (userId) => {
    // Implement delete functionality
    setUsers(users.filter((user) => user.id !== userId));
  };

  const getUserProfilePhotoUrl = (photoPath) => {
    const baseUrl = "https://kra.betaeserver.com";

    return `${baseUrl}${photoPath}`;
  };

  return (
    <>
      <Header data={userInfo} />
      <div className={styles.container}>
        <h1 className={styles.title}>User Listing</h1>
        <div className={styles.userList}>
          {userData.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.cardContent}>
                <Image
                  src={getUserProfilePhotoUrl(user.profile_photo_path)}
                  alt={`Profile of ${user.first_name}`}
                  className={styles.userImage}
                  width={100}
                  height={100}
                />
                <h2>{user.first_name + " " + user.last_name}</h2>
                <div className={styles.buttons}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserList;
