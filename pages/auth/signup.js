import React, { useState } from "react";
import Head from "next/head";
import fontStyle from "../../styles/index.module.css";
import HomeLayout from "../../src/Layouts/HomeLayout";
import styles from "../../styles/signup.module.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { setCookie, checkCookie, getCookie } from "../../util/cookie";

const useStyles = makeStyles(() => ({
  input: {
    marginTop: "1rem",
  },
}));

function Signup() {
  const classes = useStyles();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const signup = (email, name, password, password2) => {
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("password2Error").innerHTML = "";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      document.getElementById("emailError").innerHTML = email;
    }
    if (!name) {
      document.getElementById("nameError").innerHTML = "Please fill this field";
    }
    if (!password) {
      document.getElementById("passwordError").innerHTML =
        "Please fill this field";
    }
    if (!password2) {
      document.getElementById("password2Error").innerHTML =
        "Please fill this field";
    }
    if (password != password2) {
      document.getElementById("passwordError").innerHTML =
        "Passwords don't match";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <HomeLayout>
      <Head>
        <title>Bookbus - Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${fontStyle.font} ${styles.signupBox}`}>
        <TextField
          type="email"
          variant="outlined"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p id="emailError"></p>
        <TextField
          type="text"
          variant="outlined"
          label="Full name"
          style={{ marginTop: "1rem" }}
          onChange={(e) => setName(e.target.value)}
        />
        <p id="nameError"></p>
        <TextField
          type="Password"
          variant="outlined"
          label="Password"
          style={{ marginTop: "1rem" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p id="passwordError"></p>
        <TextField
          type="Password"
          variant="outlined"
          label="Confirm Password"
          style={{ marginTop: "1rem" }}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <p id="password2Error"></p>
        <button
          className={`${styles.registerButton} ${fontStyle.font}`}
          onClick={() => signup(email, name, password, password2)}
        >
          Register
        </button>
        <label style={{ margin: "0 auto", fontWeight: 400, marginTop: "2rem" }}>
          Or
        </label>
        <div className={styles.oauthTab}>Sign up with Google</div>
        <div className={styles.oauthTab}>Sign up with Facebook</div>
        <h3
          className={fontStyle.font}
          style={{
            marginTop: "4rem",
            fontWeight: 400,
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/auth/login")}
        >
          Already have an account ? Sign in here
        </h3>
      </div>
    </HomeLayout>
  );
}

export default Signup;
