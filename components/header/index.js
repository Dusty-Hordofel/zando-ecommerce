import React from "react";
import Ad from "./Ad";
import styles from "./styles.module.scss";
import Top from "./Top";

const Header = () => {
  return (
    <header className={styles.header}>
      <Ad />
      <Top />
    </header>
  );
};

export default Header;
