import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import axiosConfig from "../../util/config";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: "12px",
    cursor: "pointer",
  },
}));

const deleteComment = (commentId, city) => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .delete("/api/local-travel/City/" + city + "/delete-comment", {
        headers: {},
        data: {
          commentId: commentId,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default function MoreoptionsPopover(props) {
  const classes = useStyles();
  return (
    <Popover
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Typography
        className={classes.typography}
        onClick={async () => {
          await deleteComment(props.id, props.city).then((resolve) => {
            props.handleClose();
          });
          props.refresh();
        }}
      >
        Delete
      </Typography>
    </Popover>
  );
}
