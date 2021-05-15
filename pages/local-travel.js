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
import axiosConfig from "../util/config";
import { Avatar, useRadioGroup } from "@material-ui/core";
import { decrypt } from "../util/crypto";
import { getCookie, checkCookie } from "../util/cookie";
import querystring from "querystring";
import More from "../src/Components/More";
import dateConverter from "../util/Date";
import SuccessFailureModal from "../src/Components/SuccessFailureModal";
import MoreoptionsPopover from "../src/Components/MoreoptionsPopover";

const getComments = (city) => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .get("/api/local-travel/City/" + city + "/get-comments")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const addComment = (comment, city) => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .post(
        "/api/local-travel/City/" + city + "/add-comment",
        querystring.stringify({
          comment: comment,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

function LocalTravel(props) {
  const [coordinates, setCoordinates] = useState();
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [id, setId] = useState();
  const [successFailureOpen, setSuccessFailure] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreId, setMoreId] = useState(null);

  useEffect(async () => {
    if (props.data && props.data.length > 0) {
      let coordinates = [props.data[0].lat, props.data[0].lng];
      setData(props.data[0].transport);
      setCoordinates(coordinates);
      await getComments(props.at)
        .then((resolve) => {
          setComments(resolve.data.comments);
        })
        .catch((reject) => {});
    }
    if (checkCookie("auth")) {
      let auth = getCookie("auth");
      auth = decrypt(auth);
      setId(auth);
    }
  }, []);

  const openMorepopup = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMoreId(id);
  };

  const closeMorepopup = () => {
    setAnchorEl(null);
    setMoreId(null);
  };

  const openSuccessFailure = () => {
    setSuccessFailure(true);
  };

  const closeSuccessFailure = () => {
    setSuccessFailure(false);
  };

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
              <RickshawMarker
                name={transport.name}
                rate={transport.rate}
                routes={transport.routes}
                lat={transport.coordinates[j].lat}
                lng={transport.coordinates[j].lng}
              />
            </div>
          );
        } else if (transport.transport_type === "Bus") {
          marker = (
            <div
              lat={transport.coordinates[j].lat}
              lng={transport.coordinates[j].lng}
            >
              <BusMarker
                name={transport.name}
                rate={transport.rate}
                routes={transport.routes}
                lat={transport.coordinates[j].lat}
                lng={transport.coordinates[j].lng}
              />
            </div>
          );
        } else if (transport.transport_type === "Taxi") {
          marker = (
            <div
              lat={transport.coordinates[j].lat}
              lng={transport.coordinates[j].lng}
            >
              <TaxiMarker
                name={transport.name}
                rate={transport.rate}
                routes={transport.routes}
                lat={transport.coordinates[j].lat}
                lng={transport.coordinates[j].lng}
              />
            </div>
          );
        } else if (transport.transport_type === "Bicycle") {
          marker = (
            <div
              lat={transport.coordinates[j].lat}
              lng={transport.coordinates[j].lng}
            >
              <BicycleMarker
                name={transport.name}
                rate={transport.rate}
                routes={transport.routes}
                lat={transport.coordinates[j].lat}
                lng={transport.coordinates[j].lng}
              />
            </div>
          );
        }
        bunch = bunch.concat(marker);
      }
    }
    return bunch;
  };

  let commentsData = () => {
    if (comments.length > 0) {
      return comments.map((comment) => {
        let time;
        let image;
        time = dateConverter(comment.time);
        if (comment.author.picture) image = comment.author.picture;
        if (comment.author._id === id) {
          let popId = comment._id;
          let popOpen = false;
          if (moreId === popId) popOpen = true;
          return (
            <div className={styles2.comment_mine}>
              <div className={styles2.comment_author}>
                <Avatar src={image} referrerPolicy="no-referrer" />
                <div className={styles2.comment_author_info}>
                  <label>
                    <b>You</b>
                  </label>
                  <label style={{ fontSize: "10px" }}>{time}</label>
                </div>
                <More
                  id={popId}
                  onClick={(e) => {
                    openMorepopup(e, popId);
                  }}
                />
                <MoreoptionsPopover
                  open={popOpen}
                  anchorEl={anchorEl}
                  handleClose={closeMorepopup}
                  city={props.at}
                  id={popId}
                  refresh={async () => {
                    await getComments(props.at)
                      .then((resolve) => {
                        document.getElementById("comment-box").value = "";
                        setComments(resolve.data.comments);
                      })
                      .catch((reject) => {});
                  }}
                />
              </div>
              <p className={styles2.comment}>{comment.content}</p>
            </div>
          );
        }
        return (
          <div className={styles2.comment_other}>
            <div className={styles2.comment_author}>
              <Avatar src={image} referrerPolicy="no-referrer" />
              <div className={styles2.comment_author_info}>
                <label>
                  <b>{comment.author.name}</b>
                </label>
                <label style={{ fontSize: "10px" }}>{time}</label>
              </div>
            </div>
            <p className={styles2.comment}>{comment.content}</p>
          </div>
        );
      });
    }
    return (
      <label style={{ marginLeft: "0.8rem" }}>
        Start a discussion by adding comments
      </label>
    );
  };

  const lcData = () => {
    if (coordinates) {
      return (
        <div className={styles2.data}>
          <div className={styles2.transportTypes}>{transportTypes}</div>
          <div className={styles2.transportTypes}>
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
              style={{ width: "100%", height: "32em" }}
            >
              {markers()}
            </GoogleMapReact>
            <div className={styles2.comments_section}>
              <div
                className={`${styles2.comments_section_heading} ${styles.bus_smallText}`}
              >
                <label>
                  <b>Comments</b>
                </label>
              </div>
              <div className={styles2.comments}>{commentsData()}</div>
              <div className={styles2.comments_section_add}>
                <textarea
                  className={`${styles2.comment_input} ${styles.font}`}
                  rows={4}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add comment"
                  id="comment-box"
                />
                <button
                  className={styles2.comment_post_button}
                  onClick={async () => {
                    if (comment) {
                      await addComment(comment, props.at)
                        .then(async (resolve) => {
                          let str = "";
                          setComment(str);
                          await getComments(props.at)
                            .then((resolve) => {
                              document.getElementById("comment-box").value = "";
                              setComments(resolve.data.comments);
                            })
                            .catch((reject) => {});
                        })
                        .catch((reject) => {
                          if (reject.response) {
                            if (reject.response.status == 403) {
                              openSuccessFailure();
                            }
                          }
                        });
                    }
                  }}
                >
                  <b>Post</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (props.at && !coordinates) {
      return (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>No data found</p>
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
        <SuccessFailureModal
          open={successFailureOpen}
          close={closeSuccessFailure}
          message={"Please login to add a comment"}
        />
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
        <h2
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "#d81623",
          }}
        >
          Where are you right now?
        </h2>
        <div className={styles.chips}>{cities}</div>
        <h2
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "#d81623",
          }}
        >
          {props.at}
        </h2>
        {lcData()}
      </HomeLayout>
    </div>
  );
}

export default LocalTravel;

const getCities = (context) => {
  let uri = "https://bookmybus.herokuapp.com/api/local-travel/get-cities";
  if (context.req.connection.remoteAddress === "127.0.0.1") {
    uri = "http://localhost:3000/api/local-travel/get-cities";
  }
  return new Promise((resolve, reject) => {
    axios
      .get(uri)
      .then((response) => {
        return resolve(response.data.cities);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const getCity = (context, city) => {
  let uri = "https://bookmybus.herokuapp.com/api/local-travel/City/";
  if (context.req.connection.remoteAddress === "127.0.0.1") {
    uri = "http://localhost:3000/api/local-travel/City/";
  }
  return new Promise((resolve, reject) => {
    axios
      .get(uri + city)
      .then((response) => {
        return resolve(response.data.data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export async function getServerSideProps(context) {
  const { React_App_GOOGLE_API } = process.env;
  let data = null;
  let query = context.req.__NEXT_INIT_QUERY;
  let at = query.at;
  if (!at) at = null;
  else data = await getCity(context, at);
  if (!React_App_GOOGLE_API) React_App_GOOGLE_API = null;
  let cities = await getCities(context);
  return {
    props: {
      at: at,
      GOOGLE_API: React_App_GOOGLE_API,
      cities: cities,
      data: data,
    },
  };
}
