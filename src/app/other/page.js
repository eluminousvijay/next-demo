"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import style from "./page.module.css";
import Image from "next/image";

const thumbnails = [
  "https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  "https://imgupscaler.com/images/samples/midjourney-after.webp",
  "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("Effect");
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  useLayoutEffect(() => {
    console.log("layoutEffect");
  }, []);

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("myDatabase", 1);

      request.onerror = (event) => {
        reject("IndexedDB error: " + event.target.errorCode);
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("myObjectStore", {
          keyPath: "id",
        });
        // You can define the structure of your object store here
      };
    });
  };

  // Example of adding data to the database
  const addItem = async (item) => {
    const db = await openDB();
    const tx = db.transaction("myObjectStore", "readwrite");
    const store = tx.objectStore("myObjectStore");
    store.add(item);
  };

  // Example of retrieving data from the database
  const getAllItems = async () => {
    const db = await openDB();
    const tx = db.transaction("myObjectStore", "readonly");
    const store = tx.objectStore("myObjectStore");
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject("Error fetching data from IndexedDB");
      };
    });
  };

  return (
    <div className={style.slider}>
      {thumbnails.map((thumbnail, index) => (
        <div
          className={`${style.thumbnail} ${
            index === activeIndex ? style.active : ""
          }`}
        >
          <Image src={thumbnail} alt="Thumbnail" width={100} height={100} />
        </div>
      ))}
    </div>
  );
};

export default Slider;
