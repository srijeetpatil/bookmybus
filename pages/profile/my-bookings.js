import React, { useEffect, useState } from "react";
import Head from "next/head";
import HomeLayout from "../../src/Layouts/HomeLayout";
import styles2 from "../../styles/Mybookings.module.css";
import styles from "../../styles/index.module.css";
import { checkCookie, getCookie, setCookie } from "../../util/cookie";
import axiosConfig from "../../util/config";
import DecisionModal from "../../src/Components/DecisionModal";
import dateConverter from "../../util/Date";

function MyBookings() {
  const [data, setData] = useState([]);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [bookingData, setBookingData] = useState("");

  const agreeDecisionModal = async (busId, bookingId) => {
    await cancelTickets(busId, bookingId)
      .then((resolve) => {
        closeDecisionModal();
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        closeDecisionModal();
      });
  };

  const closeDecisionModal = () => {
    setDecisionOpen(false);
  };

  const openDecisionModal = () => {
    setDecisionOpen(true);
  };

  const cancelTickets = (busId, bookingId) => {
    return new Promise((resolve, reject) => {
      axiosConfig
        .delete("/api/cancel-ticket/", {
          headers: {},
          data: {
            bookingId: bookingId,
            busId: busId,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getMyBookings = () => {
    return new Promise((resolve, reject) => {
      axiosConfig
        .get("/api/auth/get-my-bookings")
        .then((response) => {
          resolve(response.data.result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(async () => {
    let data = [];
    if (checkCookie("auth")) {
      await getMyBookings()
        .then((resolve) => {
          setData(resolve);
        })
        .catch((reject) => {
          console.log(reject);
        });
    } else {
      window.location.href = "/";
    }
  }, []);

  const bookings = () => {
    if (data.length > 0) {
      return data.map((bus) => {
        let seats = bus.my_seats.map((seat) => {
          return <label>{seat}, </label>;
        });
        let time = bus.time;
        time = dateConverter(time);
        let today = new Date();
        return (
          <>
            <div className={styles.bus_card_tab}>
              {bus.city_from} to {bus.city_to} {"   "}{" "}
              <label style={{ fontSize: "10px" }}>booking done on {time}</label>
            </div>
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
                  <label className={styles.bus_smallText}>
                    {bus.start_place}
                  </label>
                </div>
                <div style={{ marginLeft: "2rem" }}>{bus.commute_time}</div>
                <div className={styles.bus_info}>
                  <label>
                    <b>{bus.end_time}</b>
                  </label>
                  <label className={styles.bus_smallText}>
                    {bus.end_place}
                  </label>
                </div>
                <div className={styles.bus_info}>
                  <label>To pay</label>
                  <label>
                    <b>INR {bus.total}</b>
                  </label>
                </div>
                <div className={styles.bus_seat_no}>
                  <label>Seat no {seats}</label>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <label
                  className={styles.cancel_booking}
                  onClick={() => {
                    setBookingData(bus);
                    openDecisionModal(bus.busId, bus.bookingId);
                  }}
                >
                  Cancel booking
                </label>
              </div>
            </div>
          </>
        );
      });
    }
    return (
      <h2 style={{ textAlign: "center", color: "white" }}>
        No current bookings
      </h2>
    );
  };
  return (
    <div>
      <HomeLayout>
        <Head>
          <title>Bookmybus - My Bookings</title>
        </Head>
        <DecisionModal
          open={decisionOpen}
          close={closeDecisionModal}
          agree={agreeDecisionModal}
          message={"Do you want to cancel this booking ?"}
          bookingData={bookingData}
        />
        <h1
          className={styles.font}
          style={{ textAlign: "center", color: "white" }}
        >
          <b>My Bookings</b>
        </h1>
        <div className={styles2.bookings}>{bookings()}</div>
      </HomeLayout>
    </div>
  );
}

export default MyBookings;
