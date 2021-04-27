import React, { useEffect, useState } from "react";
import HomeLayout from "../src/Layouts/HomeLayout";
import styles from "../styles/index.module.css";
import fontStyles from "../styles/index.module.css";
import styles2 from "../styles/Localtravel.module.css";
import GoogleMapReact from "google-map-react";
import { RickshawMarker, BusMarker } from "../src/Components/Markers";

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

const coordinates = [19.021042, 73.017971];

const navratna = [19.012014, 73.014302];
const palmbeach = [19.007979, 73.016003];

function LocalTravel(props) {
  const [currentPlace, setCurrentPlace] = useState("");
  const [transport, setTransport] = useState([]);

  useEffect(() => {
    if (props.at) {
      setCurrentPlace(props.at);
      searchTransport(props.at);
    }
  }, []);

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

  const createMapOptions = (maps) => {
    return {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,
    };
  };

  const transportTypes = transport.map((type) => {
    let routes;
    if (Array.isArray(type.routes)) {
      routes = type.routes.map((r) => {
        return (
          <label>
            <br />- {r}
          </label>
        );
      });
    } else {
      routes = "NA";
    }
    return (
      <div className={`${styles.bus_card} ${styles.font}`}>
        <div className={styles.bus_wrapper}>
          <div className={styles2.bus_info}>
            <label className={styles.bus_name}>
              <b>{type.name}</b>
            </label>
            <label className={styles.bus_smallText}>{type.rate}</label>
          </div>
          <div className={styles2.bus_info}>
            <label>
              <b>Time</b>
            </label>
            <label className={styles.bus_smallText}>{type.time}</label>
          </div>
          <div style={{ marginLeft: "2rem" }}></div>
          <div className={styles2.bus_info}>
            <label>
              <b>Route</b>
            </label>
            <label className={styles.bus_smallText}>{type.route}</label>
          </div>
          <div className={styles2.places}>
            <label>
              <b>Places you can reach </b>
            </label>
            <div style={{ fontSize: "12px" }}>{routes}</div>
          </div>
        </div>
      </div>
    );
  });

  const lcData = () => {
    if (currentPlace) {
      return (
        <div className={styles2.data}>
          <div className={styles2.transportTypes}>{transportTypes}</div>
          <GoogleMapReact
            resetBoundsOnResize={true}
            bootstrapURLKeys={{
              key: props.GOOGLE_API,
            }}
            defaultCenter={{
              lat: coordinates[0],
              lng: coordinates[1],
            }}
            zoom={13}
            options={createMapOptions}
            style={{ width: "32em", height: "32em" }}
          >
            <RickshawMarker lat={navratna[0]} lng={navratna[1]} />
            <BusMarker lat={palmbeach[0]} lng={palmbeach[1]} />
          </GoogleMapReact>
        </div>
      );
    }
    return <div></div>;
  };
  return (
    <div>
      <HomeLayout>
        <div className={styles2.heading}>Local travel: How does it work?</div>
        <div className={styles2.description}>
          <ul>
            <li>Select a place you want to visit in Navi Mumbai</li>
            <li>
              Get all the appropriate modes of transport data to travel locally
            </li>
            <li>
              Choose the best mode of transport that fits your requirement based
              on distance, cost, and its effect on the environment :)
            </li>
            <li>Check the places in map to find these modes of transport</li>
          </ul>
        </div>
        <div className={`${styles2.travel} ${fontStyles.font}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (document.getElementById("search").value) {
                window.location.href =
                  "/local-travel?at=" + document.getElementById("search").value;
              }
            }}
          >
            <input
              className={`${fontStyles.font} ${fontStyles.inputTextfield}`}
              type="text"
              id="search"
              placeholder="Where are you right now"
              defaultValue={props.at}
            />
          </form>
        </div>
        {lcData()}
      </HomeLayout>
    </div>
  );
}

export default LocalTravel;

export async function getServerSideProps(context) {
  const { GOOGLE_API } = process.env;
  let query = context.req.__NEXT_INIT_QUERY;
  let at = query.at;
  if (!at) at = null;
  if (!GOOGLE_API) GOOGLE_API = null;
  return {
    props: {
      at: at,
      GOOGLE_API: GOOGLE_API,
    },
  };
}
