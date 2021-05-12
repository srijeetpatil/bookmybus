import Head from "next/head";
import HomeLayout from "../src/Layouts/HomeLayout";
import styles from "../styles/index.module.css";
import { useEffect, useState } from "react";
import Bus from "../src/Components/Bus";

export default function Home(props) {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <Head>
        <title>Bookbus - book your bus tickets online here</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <HomeLayout>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
          className={styles.heading}
        >
          <Bus />
          <div className={styles.to_from_inputs}>
            <div>
              <input
                className={`${styles.font} ${styles.inputTextfield}`}
                id="fromInput"
                type="text"
                placeholder="From"
              />
            </div>
            <div>
              <input
                className={`${styles.font} ${styles.inputTextfield}`}
                id="toInput"
                type="text"
                placeholder="To"
              />
            </div>
          </div>
          <button
            className={`${styles.search_button} ${styles.font}`}
            onClick={() => {
              let from = document.getElementById("fromInput").value;
              let to = document.getElementById("toInput").value;
              if (from && to) {
                from = from.replace(" ", "");
                to = to.replace(" ", "");
                window.location.href = "/search?from=" + from + "&to=" + to;
              }
            }}
          >
            <b>Search buses</b>
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "2rem",
            }}
          >
            <div className={styles.helper_links}>
              <a href="/search?from=Mumbai&to=Pune">Mumbai to Pune</a>
            </div>
            <div className={styles.helper_links}>
              <a href="/search?from=Mumbai&to=Kolhapur">Mumbai to Kolhapur</a>
            </div>
            <div className={styles.helper_links}>
              <a href="/search?from=Mumbai&to=Nashik">Mumbai to Nashik</a>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "center", marginTop: "3rem" }}>
            Travelling in Navi Mumbai and worried about how to reach to your
            destination ? Use our local travel feature.
          </p>
          <button
            className={styles.local_travel_button}
            onClick={() => (window.location.href = "/local-travel")}
          >
            <b>Local travel</b>
          </button>
        </div>
      </HomeLayout>
    </div>
  );
}
