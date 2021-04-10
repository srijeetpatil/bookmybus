import React, { useEffect, useState } from "react";
import HomeLayout from "../../src/Layouts/HomeLayout";
import styles2 from "../../styles/Mybookings.module.css";
import styles from "../../styles/index.module.css";
import { checkCookie, getCookie, setCookie } from "../../util/cookie";

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = [];
    if (checkCookie("history")) {
      let history = getCookie("history");
      history = JSON.parse(history);
      data = history.data;
      setData(data);
    }
  }, []);

  const history = data.map((bus) => {
    let seats = bus.selectedSeats.map((seat) => {
      return <label>seat no. {seat}, </label>;
    });
    return (
      <div className={`${styles.bus_card} ${styles.font}`}>
        <div className={styles.bus_wrapper}>
          <div className={styles.bus_info}>
            <label className={styles.bus_name}>
              <b>{bus.company_name}</b>
            </label>
            <label className={styles.bus_smallText}>{bus.bus_name}</label>
          </div>
          <div className={styles.bus_info}>
            <label>
              <b>{bus.start_time}</b>
            </label>
            <label className={styles.bus_smallText}>{bus.start_place}</label>
          </div>
          <div style={{ marginLeft: "2rem" }}>{bus.commute_time}</div>
          <div className={styles.bus_info}>
            <label>
              <b>{bus.end_time}</b>
            </label>
            <label className={styles.bus_smallText}>{bus.end_place}</label>
          </div>
          <div className={styles.bus_info}>
            <label>To pay</label>
            <label>
              <b>₹ {bus.total}</b>
            </label>
          </div>
          <div className={styles.bus_info}>
            <label>{seats}</label>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <HomeLayout>
        <h1 className={styles.font} style={{ textAlign: "center" }}>
          <b>History</b>
        </h1>
        <div className={styles2.bookings}>{history}</div>
      </HomeLayout>
    </div>
  );
}

export default History;
