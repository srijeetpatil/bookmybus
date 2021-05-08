import React, { useEffect, useState } from "react";
import Head from "next/head";
import HomeLayout from "../src/Layouts/HomeLayout";
import BookingModal from "../src/Components/BookingModal";
import styles from "../styles/index.module.css";
import axios from "axios";
import { checkCookie } from "../util/cookie";
import SuccessFailureModal from "../src/Components/SuccessFailureModal";

const isLogged = () => {
  let is_logged = checkCookie("auth");
  if (is_logged) {
    return true;
  }
  return false;
};

function Search(props) {
  const [availableBuses, setAvailablebuses] = useState([]);
  const [bookModalOpen, setBookmodalOpen] = useState(false);
  const [bookModal, setBookmodal] = useState({});
  const [occ, setOcc] = useState([]);
  const [successFailureOpen, setSuccessFailure] = useState(false);

  useEffect(() => {
    if (!props.is_url) {
      window.location.href = "/";
    } else {
      setAvailablebuses(props.data);
    }
  }, []);

  const openBookingModal = (seats) => {
    let occ = [];
    for (let i = 0; i < seats.length; i++) {
      if (seats[i]) {
        occ[i] = seats[i];
      } else {
        occ[i] = null;
      }
    }
    setOcc(occ);
    setBookmodalOpen(true);
  };

  const closeBookingModal = () => {
    setBookmodalOpen(false);
  };

  const setUpBookingModal = (data) => {
    setBookmodal(data);
    openBookingModal(data.seats);
  };

  const openSuccessFailure = () => {
    setSuccessFailure(true);
  };

  const closeSuccessFailure = () => {
    setSuccessFailure(false);
  };

  const buses = () => {
    if (availableBuses.length > 0) {
      return availableBuses.map((bus) => {
        return (
          <div
            className={`${styles.bus_card} ${styles.font}`}
            id={bus.company_name}
          >
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
                <label className={styles.bus_smallText}>
                  {bus.start_place}
                </label>
              </div>
              <div style={{ marginLeft: "2rem" }}>{bus.commute_time}</div>
              <div className={styles.bus_info}>
                <label>
                  <b>{bus.end_time}</b>
                </label>
                <label className={styles.bus_smallText}>{bus.end_place}</label>
              </div>
              <div className={styles.bus_info}>
                <label>Starts from</label>
                <label>
                  <b>{bus.starting_price}</b>
                </label>
              </div>
              <div className={styles.bus_info}>
                <label>{bus.seats_available} Seats available</label>
              </div>
            </div>
            <button
              className={styles.bookButton}
              onClick={() => {
                if (isLogged()) {
                  setUpBookingModal(bus);
                } else {
                  openSuccessFailure();
                }
              }}
            >
              Book tickets
            </button>
          </div>
        );
      });
    }
    return (
      <h2 style={{ textAlign: "center" }}>
        No buses available with current parameters
      </h2>
    );
  };

  return (
    <div>
      <Head>
        <title>Bookmybus - search results</title>
        <body style={{ width: "100vw" }}></body>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BookingModal
        data={bookModal}
        open={bookModalOpen}
        close={closeBookingModal}
        occ={occ}
      />
      <SuccessFailureModal
        open={successFailureOpen}
        close={closeSuccessFailure}
        message={"Please login to perform this action"}
      />
      <HomeLayout>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className={styles.to_from_inputs}>
            <div>
              <input
                className={`${styles.font} ${styles.inputTextfield}`}
                id="fromInput"
                type="text"
                placeholder="From"
                defaultValue={props.from}
              />
            </div>
            <div style={{ marginLeft: "2rem" }}>
              <input
                className={`${styles.font} ${styles.inputTextfield}`}
                id="toInput"
                type="text"
                placeholder="To"
                defaultValue={props.to}
              />
            </div>
            <input
              type="date"
              id="date"
              name="Date"
              style={{
                marginLeft: "2rem",
                padding: "0.5rem 1rem 0.5rem 1rem",
                backgroundColor: "#fa303d",
                color: "white",
                border: "none",
              }}
            ></input>
          </div>
          <button
            className={`${styles.search_button} ${styles.font}`}
            onClick={() => {
              let from = document.getElementById("fromInput").value;
              let to = document.getElementById("toInput").value;
              if (from && to) {
                window.location.href = "/search?from=" + from + "&to=" + to;
              }
            }}
          >
            <b>Search buses</b>
          </button>
        </div>
        <div className={styles.bus_details}>{buses()}</div>
      </HomeLayout>
    </div>
  );
}

export default Search;

const searchBuses = (context, from, to) => {
  let uri = "https://bookmybus.herokuapp.com/api/search?from=";
  if (context.req.connection.remoteAddress === "127.0.0.1") {
    uri = "http://localhost:3000/api/search?from=";
  }
  return new Promise((resolve, reject) => {
    axios
      .get(uri)
      .then((response) => {
        resolve(response.data.result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export async function getServerSideProps(context) {
  let data = [];
  let query = context.req.__NEXT_INIT_QUERY;
  let from = query.from;
  let to = query.to;
  let is_url = false;
  if (to && from) {
    is_url = true;
    await searchBuses(context, from, to)
      .then((resolve) => {
        data = resolve;
      })
      .catch((reject) => {
        console.log(reject);
      });
  }
  return {
    props: {
      is_url: is_url,
      data: data,
      from: from,
      to: to,
    },
  };
}
