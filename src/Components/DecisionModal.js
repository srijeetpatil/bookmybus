import React from "react";
import { Modal, Backdrop, Fade, makeStyles } from "@material-ui/core";
import fontStyle from "../../styles/index.module.css";

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
  decisions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonAgree: {
    border: "none",
    cursor: "pointer",
    backgroundColor: "#fa303d",
    padding: "4px 2rem",
    color: "white",
    borderRadius: "2px",
  },
  buttonCancel: {
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ccc",
    padding: "4px 2rem",
    borderRadius: "2px",
  },
}));

function DecisionModal(props) {
  const classes = useStyles();

  const content = () => {
    return (
      <div className={`${classes.paper} ${fontStyle.font}`}>
        <h3>{props.message}</h3>
        <div className={classes.decisions}>
          <button
            className={classes.buttonAgree}
            onClick={() => {
              props.agree(props.bookingData.busId, props.bookingData._id);
            }}
          >
            Yes
          </button>
          <button className={classes.buttonCancel} onClick={props.close}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.close}
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

export default DecisionModal;
