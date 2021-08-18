import React from "react";
import styles from "../../styles/index.module.css";
import Header from "../Components/Header";

function HomeLayout(props) {
  return (
    <>
      <div
        style={{          
          minHeight: "80vh",
          height: "100vh",
        }}
      >
        <Header />
        <div className={styles.content}>{props.children}</div>
      </div>      
    </>
  );
}

export default HomeLayout;
