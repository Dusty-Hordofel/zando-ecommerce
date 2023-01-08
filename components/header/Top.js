import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

const Top = ({ country }) => {
  console.log("🚀 ~ file: Top.js:11 ~ Top ~ country", country);
  console.log(country.flag);
  // const [loggedIn, setLoggedIn] = useState(true);
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        {/*we empty use <div></div> as a trick to push ul to the right*/}
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt="" />
            <span>{country.name} / EUR</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img src={session.user.image} alt="" />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}

            {/* <UserMenu loggedIn={loggedIn} /> */}
            {visible && <UserMenu session={session} />}
            {/* {visible && <UserMenu loggedIn={loggedIn} />} */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
