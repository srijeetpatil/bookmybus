import React from "react";
import styles from "../../styles/index.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function HomeLayout(props) {
  return (
    <>
      <div
        style={{
          backgroundImage: "linear-gradient(#85c1e9, #dcdada)",
          minHeight: "80vh",
          height: "100%",
        }}
      >
        <Header />
        <div className={styles.content}>{props.children}</div>
      </div>
      <Footer />
    </>
  );
}

export default HomeLayout;
