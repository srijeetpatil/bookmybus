import React, { useState } from "react";
import Head from "next/head";
import fontStyle from "../../styles/index.module.css";
import HomeLayout from "../../src/Layouts/HomeLayout";
import styles from "../../styles/signup.module.css";
import { TextField, makeStyles } from "@material-ui/core";
import { setCookie, checkCookie, getCookie } from "../../util/cookie";

const useStyles = makeStyles(() => ({
  input: {
    marginTop: "1rem",
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = (email, password) => {
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      document.getElementById("emailError").innerHTML = "Invalid email";
    }
    if (!password) {
      document.getElementById("emailError").innerHTML =
        "Please fill this field";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <HomeLayout>
      <Head>
        <title>Bookbus - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${fontStyle.font} ${styles.signupBox}`}>
        <TextField type="email" variant="outlined" label="Email" />
        <p id="emailError"></p>
        <TextField
          type="Password"
          variant="outlined"
          label="Password"
          style={{ marginTop: "1rem" }}
        />
        <p id="passwordError"></p>
        <button className={`${styles.registerButton} ${fontStyle.font}`}>
          Log in
        </button>
        <label style={{ margin: "0 auto", fontWeight: 400, marginTop: "1rem" }}>
          Or
        </label>
        <div className={styles.oauthTab}>Sign in with Google</div>
        <div className={styles.oauthTab}>Sign in with Facebook</div>
        <h3
          className={fontStyle.font}
          style={{
            marginTop: "12px",
            fontWeight: 400,
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/auth/signup")}
        >
          New to bookmybus ? Sign up here
        </h3>
      </div>
    </HomeLayout>
  );
}

export default Login;
