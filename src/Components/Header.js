import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.css";
import headerStyles from "../../styles/header.module.css";
import { Avatar, makeStyles, Drawer } from "@material-ui/core";
import { decrypt } from "../../util/crypto";
import axios from "../../util/config";
import { removeCookie } from "../../util/cookie";

const logout = () => {
  removeCookie("auth");
  window.location.href = "/";
};

function Header() {
  const [drawer, setDrawer] = useState({
    right: false,
  });
  const [userdata, setUserdata] = useState();
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(async () => {
    await getMyProfile()
      .then((resolve) => {
        setUserdata(resolve);
      })
      .catch((reject) => {});
    setIsLoginChecked(true);
  }, []);

  const getMyProfile = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/get-my-profile")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };

  if (userdata && isLoginChecked) {
    return (
      <div className={styles.navbar}>
        <h1
          className={styles.font}
          style={{ cursor: "pointer", marginLeft: "2rem" }}
          onClick={() => (window.location.href = "/")}
        >
          Bookmybus
        </h1>
        <Avatar
          style={{ marginRight: "2rem", cursor: "pointer" }}
          onClick={toggleDrawer("right", true)}
        />
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={drawer["right"]}
            onClose={toggleDrawer("right", false)}
          >
            <div className={`${headerStyles.drawer} ${styles.font}`}>
              <Avatar src="" />
              <h3 className={headerStyles.username}>
                <b>{userdata.data.result.name}</b>
              </h3>
              <label
                className={headerStyles.option}
                onClick={() => (window.location.href = "/local-travel")}
              >
                <b>Local travel</b>
              </label>
              <label
                className={headerStyles.option}
                onClick={() => (window.location.href = "/profile/my-bookings")}
              >
                <b>Your current booking</b>
              </label>
              <label
                className={headerStyles.option}
                onClick={() => (window.location.href = "/profile/history")}
              >
                <b>History</b>
              </label>
              <label className={headerStyles.option} onClick={logout}>
                <b>Log out</b>
              </label>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  } else if (isLoginChecked && !userdata) {
    return (
      <div className={styles.navbar}>
        <h1
          className={styles.font}
          style={{ cursor: "pointer", marginLeft: "2rem" }}
          onClick={() => (window.location.href = "/")}
        >
          Bookmybus
        </h1>
        <div>
          <label
            style={{ marginRight: "2em", cursor: "pointer" }}
            onClick={() => (window.location.href = "/auth/login")}
          >
            Login
          </label>
          <label
            style={{ marginRight: "2em", cursor: "pointer" }}
            onClick={() => (window.location.href = "/auth/signup")}
          >
            Signup
          </label>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.navbar}>
      <h1
        className={styles.font}
        style={{ cursor: "pointer", marginLeft: "2rem" }}
        onClick={() => (window.location.href = "/")}
      >
        Bookmybus
      </h1>
    </div>
  );
}

export default Header;
