import React, { useState } from "react";
import { Modal, Backdrop, Fade, makeStyles } from "@material-ui/core";
import fontStyle from "../../styles/index.module.css";
import styles from "../../styles/BookingModal.module.css";
import { checkCookie, setCookie, getCookie } from "../../util/cookie";

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

function BookingModal(props) {
  const classes = useStyles();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [purchaseStep, setPurchaseStep] = useState(false);
  const [total, setTotal] = useState(0);

  const confirmPurchase = () => {
    if (total > 0) {
      setPurchaseStep(true);
      if (checkCookie("bookings")) {
        let bookings = getCookie("bookings");
        bookings = JSON.parse(bookings);
        props.data.total = total;
        props.data.selectedSeats = selectedSeats;
        bookings.data = bookings.data.concat([props.data]);
        bookings = JSON.stringify(bookings);
        setCookie("bookings", bookings, 5);
      } else {
        props.data.total = total;
        props.data.selectedSeats = selectedSeats;
        let bookings = {
          data: [props.data],
        };
        bookings = JSON.stringify(bookings);
        setCookie("bookings", bookings, 5);
      }
      if (checkCookie("history")) {
        let history = getCookie("history");
        history = JSON.parse(history);
        props.data.total = total;
        props.data.selectedSeats = selectedSeats;
        history.data = history.data.concat([props.data]);
        history = JSON.stringify(history);
        setCookie("history", history, 5);
      } else {
        props.data.total = total;
        props.data.selectedSeats = selectedSeats;
        let history = {
          data: [props.data],
        };
        history = JSON.stringify(history);
        setCookie("history", history, 5);
      }
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
        for (let j = 1; j <= 16; j++) {
          if (occ.indexOf(j) != -1) {
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
                  seatSelected(j);
                }}
              ></div>
            );
          } else {
            seatData = seatData.concat(<div className={styles.seat}></div>);
          }
        }
        seatData = <div className={styles.seats_left}>{seatData}</div>;
        let seatData2 = [];
        for (let j = 17; j <= 34; j++) {
          if (occ.indexOf(j) != -1) {
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
                  seatSelected(j);
                }}
              ></div>
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
                  onClick={confirmPurchase}
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
