"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "../page.module.css";
import { getInquiries } from "../api/backed/route";

const Contact = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    getInquiry();
  }, []); 

  const getInquiry = () => {
    getInquiries({}).then((response) => {
      if (response.contacts && response.contacts.length > 0) {
        let inquiryData = response.contacts;
        console.log(">>>>response>>>", inquiryData);
        setInquiries(inquiryData);
      }
    });
  };

  return (
    <>
      <main className={styles.main}>
        <Header />
        <div className={styles.intro} id="main">
          <h1>Inquiries</h1>
        </div>
      </main>
      <div className={styles.achievements}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Contact;
