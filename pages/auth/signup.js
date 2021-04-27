import React, { useEffect, useState } from "react";
import Head from "next/head";
import fontStyle from "../../styles/index.module.css";
import HomeLayout from "../../src/Layouts/HomeLayout";
import styles from "../../styles/signup.module.css";
import { setCookie, checkCookie, getCookie } from "../../util/cookie";
import axios from "axios";
import querystring from "querystring";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function Signup(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    if (checkCookie("auth")) {
      window.location.href = "/";
    }
  }, []);

  const register = async (email, name, password, password2, phone) => {
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("password2Error").innerHTML = "";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      document.getElementById("emailError").innerHTML = "Invalid email";
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
    }
    if (!phone) {
      document.getElementById("phoneError").innerHTML = "Phone not valid";
    } else {
      await signup(name, email, password, phone)
        .then((resolve) => {
          window.location.href = "/auth/login";
        })
        .catch((reject) => {
          if (reject.response) {
            alert(reject.response.data.error);
          }
        });
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  const signup = (name, email, password, phone) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "/api/auth/signup",
          querystring.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone,
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

  return (
    <HomeLayout>
      <Head>
        <title>Bookbus - Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${fontStyle.font} ${styles.signupBox}`}>
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputTextfield}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p id="emailError" style={{ color: "#fa303d" }}></p>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Your name"
            className={styles.inputTextfield}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p id="nameError" style={{ color: "#fa303d" }}></p>
        <div className={styles.inputBox}>
          <input
            type="number"
            placeholder="Phone number"
            className={styles.inputTextfield}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
        </div>
        <p id="phoneError" style={{ color: "#fa303d" }}></p>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Password"
            className={styles.inputTextfield}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p id="passwordError" style={{ color: "#fa303d" }}></p>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Confirm password"
            className={styles.inputTextfield}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <p id="password2Error" style={{ color: "#fa303d" }}></p>
        <button
          className={`${styles.registerButton} ${fontStyle.font}`}
          onClick={() => register(email, name, password, password2, phone)}
        >
          Register
        </button>
        <label style={{ margin: "0 auto", fontWeight: 400, marginTop: "2rem" }}>
          Or
        </label>
        <GoogleLogin
          clientId={props.GOOGLE_CLIENT_ID}
          buttonText="Login"
          render={(renderProps) => (
            <div className={styles.oauthTab} onClick={renderProps.onClick}>
              <svg
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 256 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#ffffff"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#ffffff"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#ffffff"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#ffffff"
                />
              </svg>
              Sign in with Google
            </div>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId={props.FACEBOOK_APP_ID}
          autoLoad={false}
          callback={responseFacebook}
          render={(renderProps) => (
            <div className={styles.oauthTab} onClick={renderProps.onClick}>
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 60.734 60.733"
                fill="#ffffff"
              >
                <g>
                  <path
                    d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914
		v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462
		v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z"
                  />
                </g>
              </svg>
              Sign up with Facebook
            </div>
          )}
        />
      </div>
    </HomeLayout>
  );
}

export default Signup;

export async function getServerSideProps(context) {
  const { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } = process.env;
  if (!FACEBOOK_APP_ID) FACEBOOK_APP_ID = null;
  if (!GOOGLE_CLIENT_ID) GOOGLE_CLIENT_ID = null;
  return {
    props: {
      FACEBOOK_APP_ID: FACEBOOK_APP_ID,
      GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
    },
  };
}
