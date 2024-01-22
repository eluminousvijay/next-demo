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
import AddUser from "./addUser"; 

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
  const [selectedUserData, setSelectedUserData] = useState();
  useEffect(() => {
    setUserToken(userInfo.access_token);
    GetData();
  }, []);

  const GetData = () => {
    getUser({ search_input: "" }).then((response) => {
      console.log(">>>>response>>>", response);
      if (response.users.length > 0) {
        let userData = response.users;
        setUserData(userData);
      }
    });
  };
  const [users, setUsers] = useState();

  const handleEdit = (userData) => {
    setSelectedUserData(userData);
  };

  const handleDelete = (userId) => {
    // Implement delete functionality
    setUsers(users.filter((user) => user.id !== userId));
  };

  const getUserProfilePhotoUrl = (photoPath) => {
    const baseUrl = "https://kra.betaeserver.com";

    // return `${baseUrl}${photoPath}`;
    return photoPath;
  };

  const handleAddUser = () => {
    console.log("Form data submitted:");
     GetData();
  };

  return (
    <>
      <Header data={userInfo} />
      <div className={styles.container}>
        <AddUser onSubmit={handleAddUser} userData={selectedUserData} />
        <h1 className={styles.title}>User Listing</h1>
        <div className={styles.userList}>
          {userData.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.cardContent}>
                {/* <Image
                  src={getUserProfilePhotoUrl(
                    "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                  )}
                  src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                  alt={`Profile of ${user.name}`}
                  className={styles.userImage}
                  width={100}
                  height={100}
                /> */}
                <Image
                  src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                  alt={`Profile of ${user.name}`}
                  className={styles.userImage}
                  width={100}
                  height={100}
                />

                <h2>{user.name}</h2>
                <div className={styles.buttons}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(user.user_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          left: "0",
          bottom: 0,
          width: "100%",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default UserList;
