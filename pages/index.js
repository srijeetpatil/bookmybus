import Head from "next/head";
import HomeLayout from "../src/Layouts/HomeLayout";
import styles from "../styles/index.module.css";
import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import BookingModal from "../src/Components/BookingModal";

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
    company_name: "Neeta tours and travels ",
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
    company_name: "Dolphin travel house ",
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
  const [availableBuses, setAvailablebuses] = useState([]);
  const [bookModalOpen, setBookmodalOpen] = useState(false);
  const [bookModal, setBookmodal] = useState({});
  const [occ, setOcc] = useState([]);

  const openBookingModal = (seats_available) => {
    let occ = [];
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let i = 0;

    while (i < seats_available) {
      let number = getRndInteger(1, 35);
      if (occ.indexOf(number) == -1) {
        occ = occ.concat([number]);
        i++;
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
    openBookingModal(data.seats_available);
  };

  const searchBuses = (from, to) => {
    let newBusdata = [];
    for (let i = 0; i < data.length; i++) {
      let fr = data[i].city_from;
      let t = data[i].city_to;
      if (from === fr && to === t) {
        newBusdata = newBusdata.concat([data[i]]);
      }
    }
    setAvailablebuses(newBusdata);
  };

  const buses = availableBuses.map((bus) => {
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
          onClick={() => setUpBookingModal(bus)}
        >
          Book tickets
        </button>
        <h1>{process.env.React_App_MONGODB_URI}</h1>
      </div>
    );
  });

  return (
    <div className="container">
      <Head>
        <title>Bookbus - book your bus tickets online here</title>
        <body style={{ width: "100vw" }}></body>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BookingModal
        data={bookModal}
        open={bookModalOpen}
        close={closeBookingModal}
        occ={occ}
      />
      <HomeLayout>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={styles.to_from_inputs}>
            <Autocomplete
              id="fromInput"
              options={cities}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="From" variant="outlined" />
              )}
            />
            <Autocomplete
              id="toInput"
              options={cities}
              getOptionLabel={(option) => option.name}
              style={{ width: 300, marginLeft: "2rem" }}
              renderInput={(params) => (
                <TextField {...params} label="To" variant="outlined" />
              )}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ marginLeft: "2rem", width: 300 }}
            />
          </div>
          <button
            className={`${styles.search_button} ${styles.font}`}
            onClick={() => {
              let from = document.getElementById("fromInput").value;
              let to = document.getElementById("toInput").value;
              if (from && to) {
                searchBuses(from, to);
              }
            }}
          >
            Search buses
          </button>
        </MuiPickersUtilsProvider>
        <div className={styles.bus_details}>{buses}</div>
      </HomeLayout>
    </div>
  );
}
