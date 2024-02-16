"use client";
import React, { useEffect, useState } from "react";

const IndexedDBComponent = () => {
  const [db, setDb] = useState();
  const [otherDb, setOtherDb] = useState();

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("myDatabase", 2); 

      request.onerror = (event) => {
        reject("IndexedDB error: " + event.target.errorCode);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("myObjectStore")) {
          const objectStore = db.createObjectStore("myObjectStore", {
            keyPath: "id",
          });
          objectStore.createIndex("name", "name", { unique: false });
          objectStore.createIndex("mobile", "mobile", { unique: false });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        db.onversionchange = function () {
          db.close(); 
          alert("Database is outdated, please reload the page.");
        };
        setDb(db);
        setOtherDb(db);
        resolve(db);
      };
    });
  };




  const addItem = async (item) => {
    console.log(">>>>>>>>>>>>", otherDb);
    if (!otherDb) {
      console.error("IndexedDB is not available.");
      return;
    }
    const tx = otherDb.transaction("myObjectStore", "readwrite");
    const store = tx.objectStore("myObjectStore");
    store.add(item).onsuccess = () => {
      console.log("Item added successfully:", item);
    };
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    openDB()
      .then(() => {
        // Database opened successfully
      })
      .catch((error) => {
        console.error("Failed to open IndexedDB:", error);
      });
  }, []);

  useEffect(() => {
    if (otherDb) {
      const user = {
        id: generateUniqueId(),
        name: "John Doe",
        mobile: "1234567890",
      };

      setTimeout(() => {
        addItem(user);
      }, 2000);
    }
  }, [otherDb]);

  return <div>IndexedDB</div>;
};

export default IndexedDBComponent;
