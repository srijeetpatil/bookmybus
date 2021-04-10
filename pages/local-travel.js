import React, { useState } from "react";
import HomeLayout from "../src/Layouts/HomeLayout";
import { TextField, makeStyles } from "@material-ui/core/";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import styles from "../styles/index.module.css";
import fontStyles from "../styles/index.module.css";
import styles2 from "../styles/Localtravel.module.css";

let cities = [
  {
    name: "Panvel",
  },
  {
    name: "Seawoods",
  },
  {
    name: "Kharghar",
  },
];

let data = [
  {
    place: "Seawoods",
    types: [
      {
        name: "Auto / Rickshaw",
        rate: "INR 18 first 2 Kms, 1 Re per 100 metres after that",
        route: "anywhere",
        time: "Depends on the distance",
        routes: "NA",
      },
      {
        name: "Sharing Auto / Rickshaw",
        rate: "INR 15",
        route: "fixed",
        routes: ["Railway stn to sec 48", "Railway stn to Navratna Hotel"],
        time: "3-4mins",
      },
      {
        name: "Bus NMMT",
        rate: "INR 7",
        route: "fixed",
        routes: [
          "Railway stn to sec 48",
          "Railway stn to Navratna Hotel",
          "Railway stn to NRI complex Seawoods",
        ],
        time: "7-8mins",
      },
      {
        name: "Walking",
        rate: "NA",
        route: "NA",
        routes: ["Sec 36, 38, 40, 42, 44, 46, 48", "D Mart"],
        time: "10-12mins",
      },
    ],
  },
  {
    place: "Kharghar",
    types: [
      {
        name: "Auto / Rickshaw",
        rate: "INR 18 first 2 Kms, 1 Re per 100 metres after that",
        route: "anywhere",
        time: "Depends on the distance",
        routes: "NA",
      },
      {
        name: "Sharing Eco van",
        rate: "INR 20",
        route: "fixed",
        routes: [
          "Railway stn to Central park",
          "Railway stn to Shilp Chowk",
          "Driving range",
        ],
        time: "3-4mins",
      },
      {
        name: "Bus NMMT",
        rate: "INR 7",
        route: "fixed",
        routes: [
          "Railway stn to Shilp Chowk",
          "Railway stn to Hiranandani Complex",
          "Railway stn to Little world mall",
        ],
        time: "7-8mins",
      },
      {
        name: "Walking",
        rate: "NA",
        route: "NA",
        routes: ["Glomax mall", "Little world mall"],
        time: "5-10mins",
      },
    ],
  },
  {
    place: "Panvel",
    types: [
      {
        name: "Auto / Rickshaw",
        rate: "INR 18 first 2 Kms, 1 Re per 100 metres after that",
        route: "anywhere",
        time: "Depends on the distance",
        routes: "NA",
      },
      {
        name: "Sharing Eco van",
        rate: "INR 30",
        route: "fixed",
        routes: [
          "Railway stn to Pillai HOC COE",
          "Railway stn to Amity University",
          "Driving range",
        ],
        time: "3-4mins",
      },
      {
        name: "Bus NMMT",
        rate: "INR 7",
        route: "fixed",
        routes: ["Railway stn to Orion mall", "Railway stn to Dmart"],
        time: "7-8mins",
      },
      {
        name: "Walking",
        rate: "NA",
        route: "NA",
        routes: ["Orion mall", "Gandhi hospital"],
        time: "5-10mins",
      },
    ],
  },
];

function LocalTravel() {
  const [currentPlace, setCurrentPlace] = useState("");
  const [transport, setTransport] = useState([]);

  const searchTransport = (place) => {
    let placeObj;
    for (let i = 0; i < data.length; i++) {
      if (place === data[i].place) {
        placeObj = data[i];
        break;
      }
    }
    if (placeObj) {
      setTransport(placeObj.types);
    } else {
      setTransport([]);
    }
  };

  const transportTypes = transport.map((type) => {
    let routes;
    if (Array.isArray(type.routes)) {
      routes = type.routes.map((r) => {
        return <label>{r}</label>;
      });
    } else {
      routes = "NA";
    }
    return (
      <div className={`${styles.bus_card} ${styles.font}`}>
        <div className={styles.bus_wrapper}>
          <div className={styles.bus_info}>
            <label className={styles.bus_name}>
              <b>{type.name}</b>
            </label>
            <label className={styles.bus_smallText}>{type.rate}</label>
          </div>
          <div className={styles.bus_info}>
            <label>
              <b>Time</b>
            </label>
            <label className={styles.bus_smallText}>{type.time}</label>
          </div>
          <div style={{ marginLeft: "2rem" }}></div>
          <div className={styles.bus_info}>
            <label>
              <b>Route</b>
            </label>
            <label className={styles.bus_smallText}>{type.route}</label>
          </div>
          <div className={styles2.places}>
            <label>
              <b>Places you can reach </b>
            </label>
            {routes}
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <HomeLayout>
        <div className={`${styles2.travel} ${fontStyles.font}`}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Autocomplete
                id="fromInput"
                options={cities}
                getOptionLabel={(option) => option.name}
                onChange={(e, v) => {
                  setCurrentPlace(v.name);
                  searchTransport(v.name);
                }}
                style={{ width: "50%", marginTop: "2rem" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Where are you right now?"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {transportTypes}
        </div>
      </HomeLayout>
    </div>
  );
}

export default LocalTravel;
