import React, { useEffect, useState } from "react";
import { Modal, Backdrop, Fade, makeStyles } from "@material-ui/core";
import fontStyle from "../../styles/index.module.css";
import styles from "../../styles/BookingModal.module.css";
import { checkCookie, setCookie, getCookie } from "../../util/cookie";
import { decrypt } from "../../util/crypto";
import axiosConfig from "../../util/config";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: "1rem 2rem 1rem 2rem",
  },
}));

const getId = () => {
  let auth = getCookie("auth");
  auth = decrypt(auth);
  return auth;
};

function BookingModal(props) {
  const classes = useStyles();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [purchaseStep, setPurchaseStep] = useState(false);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState();

  useEffect(() => {
    let id = getId();
    setId(id);
  }, []);

  const bookTickets = (seats, total) => {
    return new Promise((resolve, reject) => {
      let data = {
        seats: seats,
        total: total,
      };
      axiosConfig
        .post("api/" + props.data._id + "/book-ticket", data)
        .then((response) => {
          if (response.status == 200) {
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const confirmPurchase = async (seats, total) => {
    if (total > 0) {
      await bookTickets(seats, total)
        .then((resolve) => {
          setPurchaseStep(true);
          setTimeout(() => {
            window.location.reload(false);
          }, 3000);
        })
        .catch((reject) => {
          alert(reject);
        });
    }
  };

  const seatSelected = (num) => {
    let currentSelectedSeates = selectedSeats;
    if (currentSelectedSeates.indexOf(num) != -1) {
      let index = currentSelectedSeates.indexOf(num);
      currentSelectedSeates.splice(index, 1);
      setSelectedSeats(currentSelectedSeates);
    } else {
      currentSelectedSeates = currentSelectedSeates.concat([num]);
      setSelectedSeats(currentSelectedSeates);
    }
    let total = parseInt(
      currentSelectedSeates.length * props.data.starting_price
    );
    setTotal(total);
  };

  const content = () => {
    if (purchaseStep) {
      return (
        <div className={`${classes.paper} ${fontStyle.font}`}>
          <h2>
            Your seats have been confirmed, please pay this amount when boarding
            the bus<br></br>{" "}
            <h1 style={{ textAlign: "center", color: "green" }}>₹ {total}</h1>
            <h5 style={{ textAlign: "center" }}>
              For more details, check your current bookings in the menu
            </h5>
          </h2>
        </div>
      );
    } else {
      let seats = () => {
        let occ = props.occ;
        let seatData = [];
        for (let j = 0; j <= 15; j++) {
          if (!occ[j]) {
            seatData = seatData.concat(
              <div
                className={styles.seatFree}
                id={"seat-number" + j}
                onClick={() => {
                  if (
                    document.getElementById("seat-number" + j).style
                      .backgroundColor === "green"
                  ) {
                    document.getElementById(
                      "seat-number" + j
                    ).style.backgroundColor = "#ccc";
                  } else {
                    document.getElementById(
                      "seat-number" + j
                    ).style.backgroundColor = "green";
                  }
                  seatSelected(j + 1);
                }}
              ></div>
            );
          } else if (occ[j] === id) {
            seatData = seatData.concat(<div className={styles.seatMine}></div>);
          } else {
            seatData = seatData.concat(<div className={styles.seat}></div>);
          }
        }
        seatData = <div className={styles.seats_left}>{seatData}</div>;
        let seatData2 = [];
        for (let j = 16; j <= 33; j++) {
          if (!occ[j]) {
            seatData2 = seatData2.concat(
              <div
                className={styles.seatFree}
                id={"seat-number" + j}
                onClick={() => {
                  if (
                    document.getElementById("seat-number" + j).style
                      .backgroundColor === "green"
                  ) {
                    document.getElementById(
                      "seat-number" + j
                    ).style.backgroundColor = "#ccc";
                  } else {
                    document.getElementById(
                      "seat-number" + j
                    ).style.backgroundColor = "green";
                  }
                  seatSelected(j + 1);
                }}
              ></div>
            );
          } else if (occ[j] === id) {
            seatData2 = seatData2.concat(
              <div className={styles.seatMine}></div>
            );
          } else {
            seatData2 = seatData2.concat(<div className={styles.seat}></div>);
          }
        }
        seatData2 = <div className={styles.seats_right}>{seatData2}</div>;
        return (
          <>
            {seatData}
            {seatData2}
          </>
        );
      };
      return (
        <div className={`${classes.paper} ${fontStyle.font}`}>
          <h2 style={{ fontWeight: 300, textAlign: "center" }}>
            Book bus tickets
          </h2>
          <div className={styles.modal}>
            <div>
              <label>
                <b>Your Total</b>
              </label>
              <div className={styles.ticketDetails}>
                <label className={styles.legend}>
                  Available{" "}
                  <div
                    style={{
                      backgroundColor: "#ccc",
                      width: "15px",
                      height: "15px",
                      marginLeft: "1rem",
                    }}
                  ></div>
                </label>
                <label className={styles.legend}>
                  Unavailable{" "}
                  <div
                    style={{
                      backgroundColor: "grey",
                      width: "15px",
                      height: "15px",
                      marginLeft: "1rem",
                    }}
                  ></div>
                </label>
                <label className={styles.legend}>
                  Your booked seats{" "}
                  <div
                    style={{
                      backgroundColor: "rgb(129, 138, 2)",
                      width: "15px",
                      height: "15px",
                      marginLeft: "1rem",
                    }}
                  ></div>
                </label>
                <label className={styles.legend}>
                  Selected seats{" "}
                  <div
                    style={{
                      backgroundColor: "green",
                      width: "15px",
                      height: "15px",
                      marginLeft: "1rem",
                    }}
                  ></div>
                </label>
                <label className={styles.text}>
                  <b>{props.data.company_name}</b>
                </label>
                <label className={styles.text}>{props.data.bus_name}</label>
                <label className={styles.text}>
                  {props.data.start_place}({props.data.start_time}) to{" "}
                  {props.data.end_place}({props.data.end_time})
                </label>
                <label className={styles.text}>
                  <b>Seats: {selectedSeats.length}</b>
                </label>
                <label className={styles.text}>
                  <b>Total: INR {total}</b>
                </label>
                <button
                  className={styles.confirmButton}
                  onClick={() => confirmPurchase(selectedSeats, total)}
                >
                  Confirm
                </button>
              </div>
            </div>
            <div>
              <label>
                <b>Pick your seat/seats</b>
              </label>
              <div className={styles.seatPicker}>
                <div className={styles.seats}>{seats()}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={() => {
          if (purchaseStep) {
            window.location.reload(false);
          }
          setPurchaseStep(false);
          setSelectedSeats([]);
          setTotal(0);
          props.close();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>{content()}</Fade>
      </Modal>
    </div>
  );
}

export default BookingModal;
