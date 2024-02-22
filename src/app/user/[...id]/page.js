"use client";
import Head from "next/head";
import React, { useState } from "react";

const page = () => {
  const initialCourseSeoData = {
    MetaTitle: "My Course - Static Data",
    MetaDescription: "Learn about my course!",
  };

  const [courseseoData, setCourseseoData] = useState(initialCourseSeoData);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{courseseoData?.MetaTitle || "Fallback Title"}</title>
        <meta
          name="description"
          content={courseseoData?.MetaDescription || "Fallback Description"}
        />
        {/* Add more meta tags as needed */}
      </Head>
      ...
    </div>
  );
};

export default page;