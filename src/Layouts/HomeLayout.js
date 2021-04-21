import React from "react";
import styles from "../../styles/index.module.css";
import Header from "../Components/Header";

function HomeLayout(props) {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(#85c1e9, #dcdada)",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Header />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

export default HomeLayout;
