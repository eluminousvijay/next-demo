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
import { getUser, setUserToken, deleteUser } from "../api/backed/route";
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
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [userID, setUserID] = useState();

  useEffect(() => {console.log("store", store.getState().data.userData.userData);
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

   const handleConfirmBox = (user_id) => {
     setUserID(user_id);
     setShowConfirmBox((prevValue) => !prevValue);
   };


  const handleDelete = () => {
    // setUsers(users.filter((user) => user.id !== userId));
    deleteUser({
      user_id: userID,
    }).then((response) => {
      if (response.data.status === 200) {
        setShowConfirmBox(false);
        GetData();
      }
    });
  };

  const handleCloseModal = () => {
    setShowConfirmBox(false);
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
      {/* <Header data={userInfo} /> */}
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
                    onClick={() => handleConfirmBox(user.user_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showConfirmBox ? (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          style={{ display: "contents" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{
              height: "100%",
              width: "100%",
              marginTop: "-228px",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div
        style={{
          position: "fixed",
          left: "0",
          bottom: 0,
          width: "100%",
        }}
      > */}
      {/* <div className="fixed-bottom">
        <Footer />
      </div> */}
    </>
  );
};

export default UserList;
