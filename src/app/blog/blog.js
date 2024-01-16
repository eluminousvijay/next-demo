"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
const BlogPage = ({ parentStyles }) => {
  const blogs = [
    {
      id: 1,
      title: "Vue JS",
      content:
        "Vue.js is a progressive JavaScript framework for building user interfaces. It's designed from the ground up to be incrementally adoptable, making it easy to pick up and integrate with other libraries or existing projects. Whether you're a beginner or an experienced developer, Vue.js offers simplicity and flexibility.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-HF4YhhiPaFa7tpF8mYIjey_4uhcbi4iGa-NsJvXCJWNoAn88EPitjLmLEzmVro9pHOI&usqp=CAU",
    },
    {
      id: 2,
      title: "React JS",
      content:
        "React.js has become the go-to JavaScript library for building modern, dynamic user interfaces, and its popularity continues to soar. Whether you're a seasoned developer or just starting out, this comprehensive guide will take you on a journey through the fundamentals and advanced concepts of React.js, empowering you to create highly efficient and interactive web applications.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwg4gs1NStkYti6exgaxkAbw11zj9Z3mbAi8LzW62gsy3BmWNDusrjQ_vb25xnvhgpXs&usqp=CAU",
    },
    {
      id: 3,
      title: "Nuxt JS",
      content:
        "In the dynamic world of Vue.js development, Nuxt.js emerges as a potent framework designed to streamline the process of building server-side rendered (SSR) applications. Developed on top of Vue.js, Nuxt.js brings structure and convention to Vue projects, offering a powerful combination of simplicity and flexibility.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_U3tzLtxZK5NTXGtyAT0SEVDdN42jqZMos_6MsvhWKvqFlPNNsblj2nPeJ0gYiB48ONA&usqp=CAU",
    },
    {
      id: 4,
      title: "Next JS",
      content:
        "In the React.js ecosystem, Next.js stands out as a versatile framework that facilitates the creation of both server-side rendered (SSR) and statically generated (SSG) web applications. Developed with performance and scalability in mind, Next.js empowers developers to build robust and efficient applications with ease.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnSszlHDLSOEez7LcAlIwNnvWj5IiRCvMaTsc0sg_Dq5wySo3OHx0VF4QwyYoUPRnAY4&usqp=CAU",
    },
  ];

  const [selectedBlog, setSelectedBlog] = useState(blogs[0]);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseBlogDetails = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.blogList}>
          <div className={parentStyles.intro} id="main">
            <h1>Blogs</h1>
            {selectedBlog && (
              <div className={styles.selectedBlog}>
                <img
                  src={selectedBlog.imageUrl}
                  alt={`Image for ${selectedBlog.title}`}
                  className={styles.selectedBlogImage}
                />
                <div>
                  <h2 className={styles.blogTitle}>{selectedBlog.title}</h2>
                  <p className={styles.blogContent}>{selectedBlog.content}</p>
                  {/* <button
                className={styles.closeButton}
                onClick={handleCloseBlogDetails}
              >
                Close
              </button> */}
                </div>
              </div>
            )}
          </div>

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className={styles.blogPost}
              onClick={() => handleBlogClick(blog)}
            >
              <img
                src={blog.imageUrl}
                alt={`Image for ${blog.title}`}
                className={styles.blogImage}
              />
              <div>
                <h2 className={styles.blogTitle1}>{blog.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
