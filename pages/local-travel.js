import React, { useEffect, useState } from "react";
import Head from "next/head";
import HomeLayout from "../src/Layouts/HomeLayout";
import styles from "../styles/index.module.css";
import styles2 from "../styles/Localtravel.module.css";
import GoogleMapReact from "google-map-react";
import {
  RickshawMarker,
  BusMarker,
  TaxiMarker,
  BicycleMarker,
} from "../src/Components/Markers";
import axios from "axios";
import MarkerPopup from "../src/Components/MarkerPopup";

function LocalTravel(props) {
  const [coordinates, setCoordinates] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      let coordinates = [props.data[0].lat, props.data[0].lng];
      setData(props.data[0].transport);
      setCoordinates(coordinates);
    }
  }, []);

  const createMapOptions = (maps) => {
    return {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,
    };
  };

  const cities = props.cities.map((city) => {
    return (
      <div
        className={styles.chip}
        id={city}
        onClick={() => {
          window.location.href = "/local-travel/?at=" + city;
        }}
      >
        {city}
      </div>
    );
  });

  const transportTypes = data.map((type) => {
    let routes;
    if (type.routes.length > 0) {
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
            <label>
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

  const markers = () => {
    let bunch = [];
    for (let i = 0; i < data.length; i++) {
      let transport = data[i];
      for (let j = 0; j < transport.coordinates.length; j++) {
        let marker;
        if (transport.transport_type === "Rickshaw") {
          marker = (
            <div
              lat={transport.coordinates[j].lat}
              lng={transport.coordinates[j].lng}
            >
              <RickshawMarker name={transport.name} routes={transport.routes} />
            </div>
          );
        } else if (transport.transport_type === "Bus") {
          marker = (
            <div
              lat={transport.coordinates[j].lat}
              lng={transport.coordinates[j].lng}
            >
              <BusMarker />
            </div>
          );
        } else if (transport.transport_type === "Taxi") {
          marker = (
            <div
              lat={transport.coordinates[j].lat}
              lng={transport.coordinates[j].lng}
            >
              <TaxiMarker />
            </div>
          );
        } else if (transport.transport_type === "Bicycle") {
          marker = (
            <div
              lat={transport.coordinates[j].lat}
              lng={transport.coordinates[j].lng}
            >
              <BicycleMarker />
            </div>
          );
        }
        bunch = bunch.concat(marker);
      }
    }
    return bunch;
  };

  const lcData = () => {
    if (coordinates) {
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
            zoom={15}
            options={createMapOptions}
            style={{ width: "32em", height: "32em" }}
          >
            {markers()}
          </GoogleMapReact>
        </div>
      );
    } else if (props.at && !coordinates) {
      return (
        <h2 style={{ textAlign: "center", marginTop: "4rem" }}>
          No data found
        </h2>
      );
    }
    return <div></div>;
  };

  return (
    <div>
      <Head>
        <title>Bookbus - Local travel {props.at}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        <div className={styles2.heading}>Local travel: How does it work?</div>
        <div className={styles2.description}>
          <ul>
            <li>Select a place you want to visit in Navi Mumbai</li>
            <li>
              Get all the appropriate modes of public transport data to travel
              locally
            </li>
            <li>
              Choose the best mode of transport that fits your requirement based
              on distance, cost, and its effect on the environment :)
            </li>
            <li>Check the places in map to find these modes of transport</li>
          </ul>
        </div>
        <h3
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "#d81623",
          }}
        >
          Where are you right now?
        </h3>
        <div className={styles.chips}>{cities}</div>
        <h2>{props.at}</h2>
        {lcData()}
      </HomeLayout>
    </div>
  );
}

export default LocalTravel;

const getCities = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3000/api/local-travel/get-cities")
      .then((response) => {
        return resolve(response.data.cities);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const getCity = (city) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3000/api/local-travel/City/" + city)
      .then((response) => {
        return resolve(response.data.data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export async function getServerSideProps(context) {
  const { GOOGLE_API } = process.env;
  let data = null;
  let query = context.req.__NEXT_INIT_QUERY;
  let at = query.at;
  if (!at) at = null;
  else data = await getCity(at);
  if (!GOOGLE_API) GOOGLE_API = null;
  let cities = await getCities();
  return {
    props: {
      at: at,
      GOOGLE_API: GOOGLE_API,
      cities: cities,
      data: data,
    },
  };
}
