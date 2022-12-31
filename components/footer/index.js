import React from "react";
import Links from "./Links";
import Socials from "./Socials";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
      </div>
    </footer>
  );
};

export default Footer;
