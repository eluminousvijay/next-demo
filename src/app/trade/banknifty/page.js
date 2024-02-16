"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("Effect");
  }, [activeIndex]);



  return (
    <div>
     hiii
    </div>
  );
};

export default Slider;
