import React from "react";
import Empty from "../components/cart/empty";
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";

const cart = () => {
  const cart = [];
  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.length > 0 ? (
          <div className={styles.cart__container}></div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default cart;
