import Head from "next/head";
import HomeLayout from "../src/Layouts/HomeLayout";
import styles from "../styles/index.module.css";
import { useEffect, useState } from "react";
import Bus from "../src/Components/Bus";
import animStyles from "../styles/Localtravel.module.css";

const containerStyle = {
  width: "100%",
  height: "400px",
  zIndex: "0",
  position: "relative",
  marginTop: "2rem",
};

const coordinates = [18.99134037380452, 73.12056016593179];
const dest = [19.021055, 73.013857];

const data = [
  {
    company_name: "Konduskar travels",
    bus_name: "Volvo Multi-Axle Sleeper A/C (2+1)",
    start_time: "18:00",
    start_place: "Sion",
    end_time: "21:25",
    end_place: "Wakad",
    commute_time: "03hr 25m",
    starting_price: "300",
    seats_available: "33",
    city_from: "Mumbai",
    city_to: "Pune",
  },
  {
    company_name: "Neeta tours and travels",
    bus_name: "Bharat Benz A/C Seater (2+1)",
    start_time: "16:00",
    start_place: "Lonavala On Expressway",
    end_time: "18:10",
    end_place: "Wakad",
    commute_time: "02h 10m",
    starting_price: "320",
    seats_available: "14",
    city_from: "Mumbai",
    city_to: "Pune",
  },
  {
    company_name: "Dolphin travel house",
    bus_name: "A/C Seater (2+1)",
    start_time: "21:30",
    start_place: "Lonavala On Expressway",
    end_time: "07:30",
    end_place: "Dabholkar Corner",
    commute_time: "10h 00m",
    starting_price: "600",
    seats_available: "11",
    city_from: "Mumbai",
    city_to: "Kolhapur",
  },
  {
    company_name: "N.T. Kartik",
    bus_name: "A/C Sleeper (2+1)",
    start_time: "21:40",
    start_place: "Byculla",
    end_time: "07:30",
    end_place: "Bus Stand",
    commute_time: "10h 00m",
    starting_price: "600",
    seats_available: "25",
    city_from: "Mumbai",
    city_to: "Kolhapur",
  },
  {
    company_name: "BLACK OASIS (Ansh Roadways Pvt Ltd)",
    bus_name: "Benz A/C Sleeper (2+1)",
    start_time: "18:30",
    start_place: "Borivali West",
    end_time: "02:15",
    end_place: "Dwarka Circle",
    commute_time: "07h 45m",
    starting_price: "660",
    seats_available: "20",
    city_from: "Mumbai",
    city_to: "Nashik",
  },
  {
    company_name: "N.T. Laxman Travels",
    bus_name: "Benz A/C Sleeper (2+1)",
    start_time: "19:00",
    start_place: "Panvel",
    end_time: "02:00",
    end_place: "Dwarka Circle",
    commute_time: "07h 45m",
    starting_price: "611",
    seats_available: "30",
    city_from: "Mumbai",
    city_to: "Nashik",
  },
  {
    company_name: "Sai Virbhadra Travels",
    bus_name: "Benz A/C Sleeper (2+1)",
    start_time: "13:15",
    start_place: "Dwarka Circle",
    end_time: "02:00",
    end_place: "Borivali East",
    commute_time: "07h 45m",
    starting_price: "700",
    seats_available: "1",
    city_from: "Nashik",
    city_to: "Mumbai",
  },
];

let cities = [
  {
    name: "Mumbai",
  },
  {
    name: "Pune",
  },
  {
    name: "Kolhapur",
  },
  {
    name: "Nashik",
  },
];

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
                window.location.href = "/search?from=" + from + "&to=" + to;
              }
            }}
          >
            <b>Search buses</b>
          </button>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ textAlign: "center", marginTop: "5rem" }}>
            Travelling in Navi Mumbai and worried about how to reach to your
            destination ? Use our local travel feature.
          </h1>
          <button
            className={styles.search_button}
            onClick={() => (window.location.href = "/local-travel")}
          >
            <b>Local travel</b>
          </button>
        </div>
      </HomeLayout>
    </div>
  );
}
