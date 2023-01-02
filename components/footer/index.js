import React from "react";
import Links from "./Links";
import NewsLetter from "./NewsLetter";
import Payment from "./Payment";
import Copyright from "./Copyright";
import Socials from "./Socials";
import styles from "./styles.module.scss";

const Footer = ({ country }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Payment />
        <Copyright country={country} />
      </div>
    </footer>
  );
};

export default Footer;
