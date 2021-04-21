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
}));

function SuccessFailureModal(props) {
  const classes = useStyles();

  const content = () => {
    return (
      <div className={`${classes.paper} ${fontStyle.font}`}>
        <h3>{props.message}</h3>
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

export default SuccessFailureModal;
