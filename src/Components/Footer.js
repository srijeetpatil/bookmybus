import React from "react";
import styles from "../../styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.contact_info}>
          <label>Contact info</label>
          <a
            href="mailto:srijeetpatil7@gmail.com"
            className={styles.label}
            style={{ textDecoration: "underline" }}
          >
            srijeetpatil7@gmail.com
          </a>
          <label className={styles.label}>
            Github:-{" "}
            <a
              href="https://github.com/srijeetpatil"
              style={{ textDecoration: "underline" }}
            >
              https://github.com/srijeetpatil
            </a>
          </label>
          <label className={styles.label}>
            Repository for this app:-{" "}
            <a
              href="https://github.com/srijeetpatil/online-bus-service"
              style={{ textDecoration: "underline" }}
            >
              https://github.com/srijeetpatil/online-bus-service
            </a>
          </label>
        </div>        
      </div>
    </div>
  );
}

export default Footer;
