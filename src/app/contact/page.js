"use client";
import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "../page.module.css";

// Define a Client Component for the form handling
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted!", formData);

    // You can use fetch or any other method to send data to the server
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data sent successfully!");
      } else {
        console.error("Failed to send form data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label} htmlFor="name"> Name: </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className={styles.col}>
          <label className={styles.label} htmlFor="email"> Email: </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
      </div>

      <label className={styles.label} htmlFor="message"> Message: </label>
      <textarea className={styles.textarea} id="message" name="message" rows={4} value={formData.message} onChange={handleChange}  required ></textarea>

      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
}

// Define the Contact page component
const Contact = () => {
  return (
    <main className={styles.main}>
      <>
        {/* ... (other meta tags, title, and styles) */}
        <Header />
        <main>
          <div className={styles.intro} id="main">
            <h1>Contact Us</h1>
            <p>
              Feel free to reach out to us for any inquiries or collaborations.
            </p>
            {/* Use the ContactForm Client Component */}
            <ContactForm />
          </div>
        </main>
        <Footer />
      </>
    </main>
  );
};

export default Contact;
