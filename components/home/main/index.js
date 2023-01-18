import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Menu from "./Menu";
import Link from "next/link";
import Offers from "./offers";
import { useSession } from "next-auth/react";

// import required modules
// import { EffectCards, Navigation } from "swiper";
import User from "./User";
import Header from "./Header";

const Main = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
};

export default Main;
