This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:`bashnpm run dev# oryarn dev`Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial. You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Zando - An eCommerce Website

### Author Links

👋 Hello, I'm Hordofel Dusty BAMANA.

👇 Follow Me:

- [Twitter](https://twitter.com/hordofel)
- [LinkedIn](https://www.linkedin.com/in/dusty-hordofel-bamana-08389310a)

---

## Demo

## ![Zando Desktop Demo](./website-demo-image/desktop.png "Desktop Demo")![Zando Mobile Demo](./website-demo-image/mobile.png "Mobile Demo")

### 🚀 Description

Zando is a fully responsive ecommerce website, maximum compatiblities in all mobile devices, built using HTML, CSS, and JavaScript.I have used codewithsadee tutorial for learning purpose and follow all steps to gain new knowledges . Practice makes improvement.

---

## Section 1. Setup

### 1. Create Next app

- create zando - ecommerce folder- install nextjs

```bash
$ pnpm create next-app

```

- test Nextjs page

### 2. Css styles

- add sass

```bash
$ npm i sass

```

- create reset css styles

```css
* {
  margin: 0;
  box-sizing: border-box;
  &:before,
  &:after {
    box-sizing: border-box;
  }
}
body {
  font-family: sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
button,
input,
textarea,
select {
  font: inherit;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
img,
video,
canvas,
svg {
  max-width: 100%;
}
a {
  text-decoration: none;
  color: inherit;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
button {
  border: none;
  outline: none;
}
```

<!-- - set peer problem installing dependencies in development mode

```bash$ npm i install-peers -D

``` -->

### 3. Connect,Disconnect to the database

- create utils/db.js & connect to the database
- install mongoose
  ```bash
  $ npm i mongodb mongoose
  ```
- add mongodb connection script to the database

```javascript
import mongoose, { mongo } from "mongoose";
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database.");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database.");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not diconnecting from the database.");
    }
  }
}
const db = { connectDb, disconnectDb };
export default db;
```

- test mongodb connect using api/hello.js page

```js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../utils/db";

export default async function handler(req, res) {
  await db.connectDb();
  await db.disconnectDb();
  res.status(200).json({ name: "John Doe" });
}
```

### 4. Setup Redux toolkit with Redux Persist

```bash
npm i redux react-redux @reduxjs/toolkit redux-devtools-extension redux-persist redux-thunk next-redux-wrapper
```

- create store folder and use it store to set information available everywhere

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({});

const persistConfig = {
  key: "root",
  storage,
};

const reducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
```

- wrapp our application in a provider to access the store

```javascript
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store); //to persist the stored information
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
```

- create store/cartSlice.js

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
});

// export const {} = cartSlice.actions;
export default cartSlice.reducer;
```

`NB: we use persist to see the store changes immediately`

### 5. Making global variables accessible in next config

- create scss vzariable in base.scss file

```scss
$red-color: #ff0000b4;
```

- use scss variable in Home.module.scss

```scss
@import "./base.scss";

.red {
  color: $red-color;
}
```

- use sassOptions in next.config.js to have variables globally accessible

```js
 sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./base.scss";`,
  },
```

## Section 2. Header Component

### 6. Ad header

- cut `<Head>...</Head>` from index.js

```js
<Head>
  <title>Create Next App</title>
  <meta name="description" content="Generated by create next app" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
</Head>
```

- paste it in \_app.js .we want it to be available for all pages.

```js
import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store); //to persist the stored information
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
```

- create components/header/index.js

```js
import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
  return <div>Header</div>;
};

export default Header;
```

- create components/header/styles.module.scss
- create `<Ad/>` && `<Header/>`

```js
import Link from "next/link";
import styles from "./styles.module.scss";

const Ad = () => {
  return (
    <Link href="/browse">
      <div className={styles.ad}></div>
    </Link>
  );
};

export default Ad;
```

- add icons and images content in public folder
- style `<Ad/>` & `<Header/>`

```scss
.header {
  height: 100%;
}

.ad {
  height: 54px;
  width: 100%;
  background-image: url("../../public/images/ad.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

- create components/footer/index.js

### 7. Ad top

- create `<Top/>`

```js
import React from "react";

const Top = () => {
  return <div>Top</div>;
};

export default Top;
```

- add react icons && `<Top/>`

```js
$ npm install react-icons --save
```

- add scss variables

```scss
$blue-color: #2f82ff;
$dark-blue-color: #1a28f1dc;
$yellow-color: #fac80f;
$violet-color: #5a31f4;
$green-color: #3c811f;
$redish-color: #f15f6f;
$grey-color: #f8f8f8;
$light-error-color: #fd010169;
$error-color: #ed4337;
$error-secondary-color: #f02f2fd8;
$success-color: #6cc070;
$shadow-1: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
$shadow-2: rgba(99, 99, 99, 0.1) 0px 0px 4px 0px;
$cubic-bezier: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

- fill `<Top/>`

```js
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";

const Top = () => {
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        {/*we empty use <div></div> as a trick to push ul to the right*/}
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png"
              alt=""
            />
            <span>France / EUR</span>
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
          <li className={styles.li}>
            <div className={styles.flex}>
              <RiAccountPinCircleLine />
              <span>Account</span>
              <RiArrowDropDownFill />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
```

- style `<Top/>`

```scss
.header {
  height: 100%;
  box-shadow: $shadow-1;
}

/************************************/
/* TOP */
/************************************/

.top {
  background: #f8f8f8;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  &__container {
    max-width: 95%;
    margin: 0 auto;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__list {
    display: flex;
    gap: 15px;

    .li {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      color: #666;
      cursor: pointer;
      .flex {
        display: flex;
        align-items: center;
        gap: 2px;
        svg {
          transform: scale(1.2);
          margin-right: 3px;
        }
      }
      img {
        width: 28px;
        height: 28px;
        object-fit: cover;
        border-radius: 50%;
      }

      svg {
        width: 20px;
        height: 20px;
        fill: #ccc;
      }
      span {
        font-size: 12px;
      }
      &::after {
        content: "";
        position: absolute;
        background: #ccc;
        width: 1px;
        height: 20px;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
      }
      // we are in li , so last-of-type  means the last one
      &:last-of-type {
        &::after {
          display: none;
        }
      }
      &:hover {
        span {
          color: #222;
        }
        svg {
          fill: #666;
        }
      }
    }
  }
}
```

### 8. Top Menu part 1

- create a breakpoint to `<Top/>` style section

```scss
@media (max-width: 670px) {
  &:nth-of-type(2),
  &:nth-of-type(3),
  &:nth-of-type(4) {
    display: none;
  }
}
```

- add a conditionnal rendering fot logged use in `<Top/>`

```js
const [visible, setVisible] = useState(false);

<li>
  {loggedIn ? (
    <li className={styles.li}>
      <div className={styles.flex}>
        <img
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          alt=""
        />
        <span>MOLO</span>
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
  <div className={styles.menu}></div>
</li>;
```

- create `<userMenu/>`

```js
import Link from "next/link";
import styles from "./styles.module.scss";

const UserMenu = ({ loggedIn }) => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Zando !</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>MOLO</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined}>Login</button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/whishlist">Whishlist</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
```

- style `<userMenu/>`

```scss
.menu {
  width: 280px;
  min-height: 200px;
  box-shadow: $shadow-1;
  position: absolute;
  //   top: 100%;
  right: 0;
  background: #fff;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  h4 {
    text-align: center;
  }
  .flex {
    display: flex !important;
    gap: 10px !important;
    width: 100%;
    padding: 0 1rem;
  }
  ul {
    li {
      height: 30px;
      a {
        width: 100%;
        padding-left: 1rem !important;
      }
      &:hover {
        background: #eeeeeebe;
      }
    }
  }
  &__img {
    width: 100px !important;
    height: 100px !important;
  }
}
```

- style btn in styles/base.scss

```scss
.btn_primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: $blue-color;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  border-radius: 2px;
}
.btn_outlined {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: $blue-color;
  background: $grey-color;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  border-radius: 2px;
}
```

### 9. Top Menu part 2

- style `<userMenu/>`

```scss
.menu {
  .col {
    display: flex;
    flex-direction: column;
    span {
      &:last-of-type {
        font-size: 14px;
        color: $blue-color;
        text-decoration: underline;
      }
    }
  }
}
```

- add a mouse logic to `<Top/>`

```js
const [visible, setVisible] = useState(false);

<li
  className={styles.li}
  onMouseOver={() => setVisible(true)}
  onMouseLeave={() => setVisible(false)}
>
  ...
</li>;

{
  visible && <UserMenu loggedIn={loggedIn} />;
}
```

### 10. Search component

- create `<Main/>`

```js
import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Main = () => {
  const { cart } = useSelector((state) => ({ ...state })); //to select the cart from the store

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
          <img src="../../../logo.png" alt="" />
        </Link>
        <form className={styles.search}>
          <input type="text" placeholder="Search..." />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link href="/cart" className={styles.cart}>
          <FaOpencart />
          <span>0</span>
        </Link>
      </div>
    </div>
  );
};

export default Main;
```

- style `<Main/>`

```scss
.main {
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  &__container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
  }
  .logo {
    img {
      width: 170px;
      margin-top: 10px;
    }
  }

  .search {
    display: flex;
    align-items: center;
    flex: 1;
    background: #eeeeeebc;
    height: 40px;
    border-radius: 5px;
    input {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      background: transparent;
      padding-left: 1rem;
    }
    &__icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      background: $blue-color;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
      svg {
        width: 21px;
        height: 21px;
        fill: #fff;
      }
    }
  }
}

.cart {
  position: relative;
  svg {
    width: 35px;
    height: 35px;
    fill: #666;
    cursor: pointer;
    &:hover {
      fill: $blue-color;
    }
  }
  span {
    position: absolute;
    top: -5px;
    right: -10px;
    background: $blue-color;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-weight: 600;
    color: #fff;
  }
}
```

## Section 3. Footer Component

### 11. Footer links

- create `<Links/>`

```js
import Link from "next/link";
import styles from "./styles.module.scss";

const Links = () => {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul>
          {i === 0 ? (
            <img src="../../../logo.png" alt="" />
          ) : (
            <b>{link.heading}</b>
          )}
          {link.links.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
const links = [
  {
    heading: "SHOPPAY",
    links: [
      {
        name: "About us",
        link: "",
      },
      {
        name: "Contact us",
        link: "",
      },
      {
        name: "Social Responsibility",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "How To Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "Customer service",
    links: [
      {
        name: "Customer service",
        link: "",
      },
      {
        name: "Terms and Conditions",
        link: "",
      },
      {
        name: "Consumers (Transactions)",
        link: "",
      },
      {
        name: "Take our feedback survey",
        link: "",
      },
    ],
  },
];

export default Links;
```

- update `<Footer/>`

```js
import React from "react";
import Links from "./Links";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
      </div>
    </footer>
  );
};

export default Footer;
```

- style `<Links/>`

```scss
.footer {
  background: #f8f8f8;
  &__container {
    position: relative;
    width: 100%;
    display: grid;
    gap: 3rem;
    padding: 1rem;
  }
  img {
    width: 140px;
    height: 40px;
    object-fit: contain;
  }
  h3 {
    font-size: 12px;
    font-weight: 700;
    color: #222;
  }

  &__links {
    grid-area: links;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    ul {
      padding: 5px;
      b {
        text-transform: uppercase;
      }
      li {
        font-size: 12px;
        a {
          color: #666;
          line-height: 23px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
```

### 12. Footer Socials & Newsletter

- create `<Socials/>`

```js
import styles from "./styles.module.scss";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import {
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsPinterest,
  BsSnapchat,
} from "react-icons/bs";
export default function Socials() {
  return (
    <div className={styles.footer__socials}>
      <section>
        <h3>STAY CONNECTED</h3>
        <ul>
          <li>
            <a href="/" target="_blank">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsInstagram />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsTwitter />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsYoutube />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsPinterest />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsSnapchat />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
```

- style `<Socials/>`

```scss
&__socials {
  grid-area: socials;
  section {
    ul {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 1rem;
      li {
        font-size: 2rem;
        color: #666;
        &:hover {
          color: $blue-color;
        }
      }
    }
  }
}
&__flex {
  display: flex;
  margin-top: 10px;
}
```

- create `<NewsLetter/>`

```js
import Link from "next/link";
import styles from "./styles.module.scss";
export default function NewsLetter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>SIGN UP FOR OUR NEWSLETTER</h3>
      <div className={styles.footer__flex}>
        <input type="text" placeholder="Your Email Address" />
        <button className={styles.btn_primary}>SUBSCRIBE</button>
      </div>
      <p>
        By clicking the SUBSCRIBE button, you are agreeing to{" "}
        <Link href="">our Privacy & Cookie Policy</Link>
      </p>
    </div>
  );
}
```

- style `<NewsLetter/>`

```scss
&__newsletter {
  grid-area: newsletter;
  input {
    outline: none;
    border: 1px solid #999;
    flex: 1;
    height: 40px;
    font-size: 14px;
    padding-left: 10px;
  }
  button {
    width: 150px;
  }
  p {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    a {
      color: $blue-color;
      text-decoration: underline;
    }
  }
}
```

### 13. Footer Payment, Copyright & Responsive Footer

- create `<Payment/>`

```js
import styles from "./styles.module.scss";

const Payment = () => {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <img src="../../../images/payment/visa.webp" alt="" />
        <img src="../../../images/payment/mastercard.webp" alt="" />
        <img src="../../../images/payment/paypal.webp" alt="" />
      </div>
    </div>
  );
};

export default Payment;
```

- style `<Payment/>`

```scss
&__payment {
  grid-area: payment;
}
&__flexwrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
  img {
    width: 60px;
    height: 36px;
    object-fit: cover;
  }
}
```

- create `<Copyright/>`

```js
import Link from "next/link";
import styles from "./styles.module.scss";
import { IoLocationSharp } from "react-icons/io5";

const Copyright = ({ country }) => {
  return (
    <div className={styles.footer__copyright}>
      <section>©2022 SHOPPAY All Rights Resereved.</section>
      <section>
        <ul>
          {data.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> {country.name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};
const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];

export default Copyright;
```

- style `<Copyright/>`

```scss
&__copyright {
  grid-area: copyright;
  section {
    font-size: 12px;
    color: #666;
    padding-bottom: 10px;
  }
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 2rem;
    li {
      position: relative;
      text-decoration: underline;
      &::after {
        content: "";
        width: 1px;
        height: 15px;
        background: #666;
        position: absolute;
        right: -1rem;
      }
      &:last-of-type::after {
        display: none;
      }
    }
  }
}
```

## Section 4. Location Detection

### 14. Detect user location using IpRegistry

- use [ipregistry](https://ipregistry.co/) to locate visitors by IP address
- add axios

```bash
npm i axios
```

- use nextjs getServerSideProps (Server-Side Rendering)

```js
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  console.log("🚀 ~ file: index.js:11 ~ Home ~ country", country);
  return (
    <>
      <Header country={country} />
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(context) {
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY}`)
    .then((res) => res.data.location.country)
    .catch((error) =>
      console.log("🚀 ~ file: index.js:22 ~ getServerSideProps ~ error", error)
    );
  console.log("🚀 ~ file: index.js:26 ~ getServerSideProps ~ data", data);
  return {
    props: { country: { name: data.name, flag: data.flag.emojitwo } }, // will be passed to the page component as props
  };
}
```

- use country props in `<Header/>` & `<Footer/>`
- pass country props from `<Header/>` to `<Top country={country} />`
- pass country props from `<Footer/>` to `<Copyright country={country} />`

## Section 5. Next Authentication

### 15. Next auth setup

- add next-auth

```bash
npm i next-auth
```

- create server side authentication folder `/pages/api/auth/[...nextauth].js`
- paste authentication method from (Nextjs)[https://next-auth.js.org/]

```js
import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: "NextAuth.js <no-reply@example.com>",
    }), // we will not use EmailProvider
  ],
});
```

- add a session provider to \_app.js

```js
import { SessionProvider } from "next-auth/react";

pageProps: { session, ...pageProps }: { session, ...pageProps }

<SessionProvider session={session}>...</SessionProvider>;
```

- test the session provider in `<Home/>`

### 16. JSON web tokens & Mongodb adapter

- udpate NexAuth information

```js
import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});
```

- Install [MongoDB-adapter ](https://next-auth.js.org/adapters/mongodb) to add user to the database

```bash
npm install next-auth @next-auth/mongodb-adapter mongodb
```

- create auth/lib/mongodb.ts

```js
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
```

- Add this adapter to your pages/api/auth/[...nextauth].js next-auth configuration object.

```js
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  ...
})
```

### 17. [Github Provider](https://next-auth.js.org/providers/github)

- [Configure Github provider](https://github.com/settings/applications/new)

```bash
http://localhost:3000/api/auth/callback/github
```

- add Github Provider to NextAuth

```js
import GitHubProvider from "next-auth/providers/github";

...
providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
]
...
```

- generate a new client secret

### 18. Google provider

- go to [Google Cloud Console](https://console.cloud.google.com/welcome?project=arched-market-367511&hl=fr) & create a project (Zando)
- test signing process with google provider

### 19. Header session

- update `<Top/> <UserMenu/>` adding user session

### 20. Twitter provider

- use twitter Provider buy using [Twitter API](https://developer.twitter.com

### 21. Auth0 provider

- use [Auth0 provider](https://next-auth.js.org/providers/auth0)

```js
import Auth0Provider from "next-auth/providers/auth0";
...
providers: [
  Auth0Provider({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH0_ISSUER
  })
]
...
```

- create Nextjs application in [Auth0](https://manage.auth0.com/dashboard/us/dev-3m3vgdiu/applications) choosing `Regular Web Application` and download sample file to get credentials.
- update [Auth0 settings](XXXXXXXXXXX ADD IMAGES XXXX) section by adding a `callback url` and `allowed logout url`.

### 22. Signing Page 1

- import `<Header/>` and `<Footer/>` signin page

```js
import Header from "../components/header";
import Footer from "../components/footer";

const signin = () => {
  return (
    <>
      <Header />
      <Footer country="France" />
    </>
  );
};

export default signin;
```

- add content in `Signing Page`

```js
<>
  <Header country="France" />
  <div className={styles.login}>
    <div className={styles.login__container}>
      <div className={styles.login__header}>
        <div className={styles.back__svg}>
          <BiLeftArrowAlt />
        </div>
        <span>
          We'd be happy to join us ! <Link href="/">Go Store</Link>
        </span>
      </div>
      <div className={styles.login__form}>
        <h1>Sign in</h1>
        <p>Get access to one of the best Eshopping services in the world.</p>
      </div>
    </div>
  </div>
  <Footer country="France" />
</>
```

- style `Signing Page`

```scss
.login {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  &__container {
    padding: 3rem;
    &:last-of-type {
      margin-top: 3rem;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 300px;
    .back__svg {
      width: 50px;
      height: 50px;
      border: 1px solid #66666657;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;

      &:hover {
        border-color: $blue-color;
        svg {
          fill: $blue-color;
        }
      }
      svg {
        width: 20px;
        height: 20px;
        fill: #222;
      }
    }
    span {
      font-weight: 600;
      font-size: 14px;
      //padding-left: 10px;
      a {
        color: $blue-color;
        cursor: pointer;
        border-bottom: 1px solid $blue-color;
        padding-bottom: 5px;
      }
    }
  }
}
```

### 23. Signing Page 2

- create `<LoginInput/>`

```js
import styles from "./styles.module.scss";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

export default function LoginInput({ icon, placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.input}>
      {icon == "user" ? (
        <BiUser />
      ) : icon == "email" ? (
        <SiMinutemailer />
      ) : icon == "password" ? (
        <IoKeyOutline />
      ) : (
        ""
      )}
      <input type={field.type} name={field.name} placeholder={placeholder} />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
```

- style `<LoginInput/>`

```scss
.input {
  position: relative;
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
  svg {
    width: 25px;
    height: 25px;
    stroke: #6666669a;
    fill: #6666669a;
  }
  input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    &::placeholder {
      color: #aaa;
      font-weight: 500;
    }
  }
}
.error {
  background: $light-error-color !important;
  margin-top: 5rem !important;
  input {
    color: #fff !important;
    &::placeholder {
      color: #fff !important;
    }
  }
  svg {
    fill: #fff !important;
    stroke: #fff;
  }
}
.error__popup {
  position: absolute;
  top: -70px;
  background: $error-color;
  height: 60px;
  width: 100%;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  padding: 10px;
  span {
    position: absolute;
    bottom: -9px;
    left: 1rem;
    border-top: 10px solid $error-color;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
}
Footer

```

- create `components/buttons/circledIconBtn/index.js`

  ```js
  import { BiRightArrowAlt } from "react-icons/bi";
  import styles from "./styles.module.scss";
  export default function CircledIconBtn({ type, text, icon }) {
    return (
      <button className={styles.button} type={type}>
        {text}
        <div className={styles.svg__wrap}>
          <BiRightArrowAlt />
        </div>
      </button>
    );
  }
  ```

- style `<circledIconBtn/>`

```scss
.button {
  position: relative;
  border: none;
  outline: none;
  width: 220px;
  height: 55px;
  font-weight: 600;
  color: #fff;
  background: $blue-color;
  display: block;
  border-radius: 55px;
  cursor: pointer;

  .svg__wrap {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    position: absolute;
    top: 7.5px;
    right: 5px;
    background: $grey-color;
    svg {
      fill: $blue-color;
    }
  }
}
```

- create `Signing Page` form using [Formik](https://www.npmjs.com/package/formik) and [Yup](https://www.npmjs.com/package/yup)

```bash
npm i formik yup
```

### 24. Sign in page 3 - Custom input with yup

- install [react-spinners
  ](https://www.npmjs.com/package/react-spinners)

```css
$ npm i react-spinners
```

- create <DotLoaderSpinner />

```js
import styles from "./styles.module.scss";
import DotLoader from "react-spinners/DotLoader";
export default function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
}
```

```scss
.loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
  display: grid;
  place-items: center;
}
```

### 25. Sign in page 4 - Custom input with yup

- add yup validation logic

```js
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Email address is required.")
    .email("Please enter a valid email address."),
  login_password: Yup.string().required("Please enter a password"),
});
const registerValidation = Yup.object({
  name: Yup.string()
    .required("What's your name ?")
    .min(2, "First name must be between 2 and 16 characters.")
    .max(16, "First name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
  conf_password: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});
```

### 26. Sign in page 4 button Socials

- add socials Providers pages/signin/getServerSideProps()

```js
//use social Providers
<div className={styles.login__socials}>
  <span className={styles.or}>Or continue with</span>
  <div className={styles.login__socials_wrap}>
    {providers.map((provider) => {
      if (provider.name == "Credentials") {
        return;
      }
      return (
        <div key={provider.name}>
          <button
            className={styles.social__btn}
            onClick={() => signIn(provider.id)}
          >
            <img src={`../../icons/${provider.name}.png`} alt="" />
            Sign in with {provider.name}
          </button>
        </div>
      );
    })}
  </div>
</div>;

//get social Providers
export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders()); //Object.values is use to transform Object to Array
  return {
    props: {
      providers,
    },
  };
}
```

### 27. Sign up backend logic 1

- create pages/api/auth/signup.js
- use next connec to manage our request

```bash
npm i next-connect bcrypt jsonwebtoken

```

- create utils/validation.js to validate email

```js
export const validateEmail = (email) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};
```

- create [User model](./models/User.js)

```js
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter your full name.",
    },
    email: {
      type: String,
      required: "Please enter your email address.",
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: '"Please enter a password.',
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        style: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
```

- create utils/tokens/createActivationToken

```js
import jwt from "jsonwebtoken";
export const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};
export const createResetToken = (payload) => {
  return jwt.sign(payload, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "6h",
  });
};
```

### 28. Sign up 2 Send email 1

- use [Google Cloud Console](https://console.cloud.google.com/apis/credentials/consent?hl=fr&project=zando-373510) and go to ` Zando ``Écran de consentement OAuth `
- use `Google credentials` in [Developers Playground](https://developers.google.com/oauthplayground/)
- add `https://mail.google.com/` and credentials.
- exchange `Authorization code` to `Exchange authorization code for tokens`
- add `MAILING_SERVICE_CLIENT_ID`,`MAILING_SERVICE_CLIENT_SECRET`,`MAILING_SERVICE_CLIENT_REFRESH_TOKEN ` & `MAILING_SERVICE_CLIENT_ACCESS_TOKEN` to `.env` file.
- add google apis and nodemailer

```bash
npm i googleapis nodemailer
```

### 29. Sign up 2 Send email 2

- create utils/sendEmail.js

```js
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { activateEmailTemplate } from "../emails/activateEmailTemplate";
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//send email

export const sendEmail = (to, url, txt, subject, template) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: template(to, url),
  };
  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) return err;
    return infos;
  });
};
```

### 30. Sign up 6 Send email 3

- use [stripo](https://stripo.email/fr/) to create email template

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family:Montserrat, sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>New Template</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
      rel="stylesheet"
    />
    ...
  </head>
  ...
</html>
```

### 31. Sign up 7 submit

- add `signUpHandler()` to add register a new user

```js
const signUpHandler = async () => {
  try {
    setLoading(true);
    const { data } = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    setUser({ ...user, error: "", success: data.message });
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setUser({ ...user, success: "", error: error.response.data.message });
  }
};
```

### 32. Sign up 8 Redirect

- redirect user after signUp to login page

```js
setTimeout(async () => {
  Router.push("/");
}, 2000);
```

- use a `<DotLoaderSpinner/>`

### 33. Sign in with Next auth and submit

- add [Credentials Provider](https://next-auth.js.org/providers/credentials) to [...nextauth].js

```js
   CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (user) {
          return SignInUser({ password, user });
        } else {
          throw new Error("This email does not exist.");
        }
      },
    }),
```

- create `SignInUser()`

```js
const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password.");
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Email or password is wrong!");
  }
  return user;
};
```

- create `pages/signin/SignInHandler()`

```js
const signInHandler = async () => {
  setLoading(true);
  let options = {
    redirect: false,
    email: login_email,
    password: login_password,
  };
  const res = await signIn("credentials", options);
  setUser({ ...user, success: "", error: "" });
  setLoading(false);
  if (res?.error) {
    setLoading(false);
    setUser({ ...user, login_error: res?.error });
  } else {
    return Router.push(callbackUrl || "/");
  }
};
```

- update `pages/signin/signUpHandler()`

```js
setTimeout(async () => {
  let options = {
    redirect: false,
    email: email,
    password: password,
  };
  const res = await signIn("credentials", options);
  Router.push("/");
}, 2000);
```

### 34. Callbacks in Next auth

- add callbacks in `[...nextauth].js`

```js
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub); //sub is the id of the user in the data base, it's present in the token
      session.user.id = token.sub || user._id.toSting();
      session.user.role = user.role || "user";
      token.role = user.role || "user";
      return session;
    },}
```

### 35. csrfTOken redirect

- `csrfTOken` `redirect `to secure connection and redirect user

```js
<input type="hidden" name="csrfToken" defaultValue={csrfToken} />;

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders()); //Object.values is use to transform Object to Array
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}
```

## Section 6. forgot,reset password

### 36. Forgot Frontend Side

- create pages/auth/`forgot.js`

```js
import styles from "../../styles/forgot.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../components/buttons/circledIconBtn";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import DotLoaderSpinner from "../../components/loaders/dotLoader";
import axios from "axios";
import { getSession } from "next-auth/react";

export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
  });
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forgot your password ? <Link href="/">Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <CircledIconBtn type="submit" text="Send link" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}
```

- create styles/`forgot.module.scss`

```scss
.forgot {
  min-height: calc(100vh - 540px);
  display: grid;
  place-items: center;
  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    .back__svg {
      width: 50px;
      height: 50px;
      border: 1px solid #66666657;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;

      &:hover {
        border-color: $blue-color;
        svg {
          fill: $blue-color;
        }
      }
      svg {
        width: 20px;
        height: 20px;
        fill: #222;
      }
    }
    span {
      font-weight: 600;
      font-size: 14px;
      //padding-left: 10px;
      a {
        color: $blue-color;
        cursor: pointer;
        border-bottom: 1px solid $blue-color;
        padding-bottom: 5px;
      }
    }
  }
}
```

### 37. Forgot Backend Side

- create api/auth/`forgot.js`

```js
import nc from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";
const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your password.", resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "An email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
```

- create a forgot request in postman and test it

```js
url : http://localhost:xxx/api/auth/forgot;
body: {
   "email":"xxxxx@xxxxxx.com"
}
```

- create a new [stripo](https://stripo.email/fr/) template

```html
export const resetEmailTemplate = (to, url) => { return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family:arial, 'helvetica neue', helvetica, sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>It happens to everyone</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
      rel="stylesheet"
    />
    <!--<![endif]-->
    <style type="text/css">
      .es-button-border:hover a.es-button,
      .es-button-border:hover button.es-button {
        background: #58dfec !important;
        border-color: #58dfec !important;
      }
      .es-button-border:hover {
        border-color: #26c6da #26c6da #26c6da #26c6da !important;
        background: #58dfec !important;
        border-style: solid solid solid solid !important;
      }
      [data-ogsb] .es-button.es-button-1 {
        padding: 5px 15px !important;
      }
    </style>
  </head>
  ...
</html>
```

-

### 38. Reset password Frontend

- create auth/`reset/[token].js`

```js
import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../../components/buttons/circledIconBtn";
import LoginInput from "../../../components/inputs/loginInput";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import jwt from "jsonwebtoken";
import { Router } from "next/router";

export default function reset({ user_id }) {
  console.log("🚀 ~ file: README.md:2621 ~ reset ~ user_id", user_id);
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password.")
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password ? <Link href="/">Login instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConf_password(e.target.value)}
                />

                <CircledIconBtn type="submit" text="Submit" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}
```

- use `getServerSideProps` in auth/`reset/[token].js`

```js
export async function getServerSideProps(context) {
  const { query, req } = context;
  const token = query.token;
  const user_id = jwt.verify("pojadphjapidja", process.env.
  console.log(user_id);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}
```

### 39. Reset password Backend

- create [reset.js](./pages/api/auth/reset.js)

```js
import nc from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";
const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This Account does not exist." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });
    res.status(200).json({ email: user.email });
    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
```

## Section 7. Home Page

### 40. Home main structure

- create [index.js](./components/home/main/index.js), [Header.js](./components/home/main/index.js), [Menu.js](./components/home/main/index.js) , [swiper.js](./components/home/main/index.js), [User.js](./components/home/main/User.js) and [styles.modules.scss](./components/home/main/styles.module.scss) in `./components/home/main`.
- style `<Home/>` using [Home.module.scss](./styles/Home.module.scss)

```scss
.home {
  min-height: 100vh;
  background: $grey-color;
  &__category {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    @media (max-width: 850px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 550px) {
      grid-template-columns: 1fr;
    }
  }
  .products {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
```

- style `<Main/>`using [styles.modules.scss](./components/home/main/styles.module.scss)

```scss
.main {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 10px;
  grid-template-areas:
    "menu header header"
    "menu swiper user"
    "menu offers user";
  @media (max-width: 1232px) {
    grid-template-columns: 1fr 3fr;
  }
  @media (max-width: 990px) {
    grid-template-columns: 80px 3fr;
  }
  @media (max-width: 730px) {
    grid-template-areas:
      "menu"
      "swiper"
      "offers";
    grid-template-columns: 1fr;
    .menu {
      width: 100% !important;
      height: fit-content !important;
      &__list {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap;
        justify-content: center;
        li {
          transform: translateY(-25px);
        }
      }
    }
  }
}
```

- style `<Menu/>`using [styles.modules.scss](./components/home/main/styles.module.scss)

```scss
.menu {
  grid-area: menu;
  height: 580px;
  background: #fff;
  border-radius: 10px;
  box-shadow: $shadow-1;
  @media (max-width: 990px) {
    width: 80px;
    svg {
      transform: scale(1.5);
    }
    &__list {
      display: flex;
      flex-direction: column;
      align-items: center;
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  &__header {
    width: 100%;
    height: 35px;
    background: $grey-color;
    border-bottom: 1px solid $grey-color;
    box-shadow: $shadow-2;
    @media (max-width: 990px) {
      display: none !important;
      svg,
      b {
        display: none;
      }
    }
    svg {
      height: 23px;
      width: 23px;
    }
  }
  &__list {
    margin-top: 3px;
  }
  ul {
    li {
      height: 32px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: $grey-color;
      }

      a {
        padding: 0 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #424141;
        svg {
          fill: #8c8484;
          stroke: #8c8484;
        }
        span {
          @media (max-width: 990px) {
            display: none;
          }
        }
      }
    }
  }
}
```

- style `<Header/>`using [styles.modules.scss](./components/home/main/styles.module.scss)

```scss
.header {
  grid-area: header;
  height: 40px;
  display: flex;
  align-items: center;
  @media (max-width: 730px) {
    display: none !important;
  }
  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    li {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 19px;
      color: $blue-color;
    }
  }
}
```

- style `<swiper/>`using [styles.modules.scss](./components/home/main/styles.module.scss)

```scss
.swiper {
  grid-area: swiper;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  box-shadow: $shadow-1;
}
```

- style `<offers/>`using [styles.modules.scss](./components/home/main/styles.module.scss)

```scss
.offers {
  position: relative;
  grid-area: offers;
  overflow: hidden;
  height: 220px;
  background: #fff;
  border-radius: 10px;
  box-shadow: $shadow-1;
  // background-image: url("../../../public/images/flash.webp");
  background-image: url("https://img.lovepik.com/background/20211021/large/lovepik-e-commerce-banner-background-image_500366534.jpg");
  background-image: url("https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-contrast-color-wave-point-geometric-banner-image_9983.jpg");
  background-image: url("https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-color-horn-polygon-pop-wind-image_16349.jpg");
  //background-position: -275px -135px;
  background-size: cover;
  background-repeat: no-repeat;
  &__text {
    max-width: 200px;
    position: absolute;
    top: 1.3rem;
    left: 2rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.418);
    padding: 1rem;
    color: $blue-color;
    text-align: center;
    b {
    }
    a {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $blue-color;
      height: 40px;
      font-weight: 600;
      font-size: 1rem;
      color: #fff;
      border: 1px solid #fff;
      animation: all 0.2s ease-in-out;
      border-color: #fff;
      &:hover {
        transform: scale(1.05);
        font-size: 16px;
      }
    }
  }
}
```

### 41. Home menu

- create [data](./data/home.js) to `./data/home.js`.

- add menu information [Menu.js](./components/home/main/Menu.js) .

```js
export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map((item, i) => (
            <li>
              <Link href={item.link}>
                <a>
                  {i == 0 ? (
                    <GiLargeDress />
                  ) : i == 1 ? (
                    <GiClothes />
                  ) : i == 2 ? (
                    <GiHeadphones />
                  ) : i == 3 ? (
                    <GiWatch />
                  ) : i == 4 ? (
                    <HiOutlineHome />
                  ) : i == 5 ? (
                    <GiHealthCapsule />
                  ) : i == 6 ? (
                    <GiBallerinaShoes />
                  ) : i == 7 ? (
                    <GiBigDiamondRing />
                  ) : i == 8 ? (
                    <GiSportMedal />
                  ) : i == 9 ? (
                    <FaBaby />
                  ) : i == 10 ? (
                    <BiCameraMovie />
                  ) : i == 11 ? (
                    <MdOutlineSportsEsports />
                  ) : i == 12 ? (
                    <BsPhoneVibrate />
                  ) : i == 13 ? (
                    <MdOutlineSmartToy />
                  ) : i == 14 ? (
                    <BiGift />
                  ) : i == 15 ? (
                    <Gi3DHammer />
                  ) : i == 16 ? (
                    <AiOutlineSecurityScan />
                  ) : (
                    ""
                  )}
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
```

- style [Menu.js](./components/home/main/Menu.js) in [styles.module.scss](./components/home/main/styles.module.scss)

```scss
.menu {
  grid-area: menu;
  height: 580px;
  background: #fff;
  border-radius: 10px;
  box-shadow: $shadow-1;
  @media (max-width: 990px) {
    width: 80px;
    svg {
      transform: scale(1.5);
    }
    &__list {
      display: flex;
      flex-direction: column;
      align-items: center;
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  &__header {
    width: 100%;
    height: 35px;
    background: $grey-color;
    border-bottom: 1px solid $grey-color;
    box-shadow: $shadow-2;
    @media (max-width: 990px) {
      display: none !important;
      svg,
      b {
        display: none;
      }
    }
    svg {
      height: 23px;
      width: 23px;
    }
  }
  &__list {
    margin-top: 3px;
  }
  ul {
    li {
      height: 32px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: $grey-color;
      }

      .anchor {
        padding: 0 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #424141;
        svg {
          fill: #8c8484;
          stroke: #8c8484;
        }
        span {
          @media (max-width: 990px) {
            display: none;
          }
        }
      }
    }
  }
}
```

### 42. Home user menu markup

- update [User.js](./components/home/main/User.js)

```js
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards, Navigation } from "swiper";
import { userSwiperArray } from "../../../data/home";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <img
        src="../../../images/userHeader.jpg"
        alt=""
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user?.image} alt="" />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <img
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              alt=""
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile">
              {/* <a> */}
              <IoSettingsOutline />
              {/* </a> */}
            </Link>
          </li>
          <li>
            <Link href="">
              {/* <a> */}
              <HiOutlineClipboardList />
              {/* </a> */}
            </Link>
          </li>
          <li>
            <Link href="">
              {/* <a> */}
              <AiOutlineMessage />
              {/* </a> */}
            </Link>
          </li>
          <li>
            <Link href="">
              {/* <a> */}
              <BsHeart />
              {/* </a> */}
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <img
            src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
            alt=""
            className={styles.new}
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item) => (
              <SwiperSlide>
                <Link href="">
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <img
        src="../../../images/userHeader.jpg"
        alt=""
        className={styles.user__footer}
      />
    </div>
  );
}
```

- style [User.js](./components/home/main/User.js)

```scss
.user {
  position: relative;
  grid-area: user;
  height: 530px;
  background: #fff;
  border-radius: 10px;
  box-shadow: $shadow-1;
  @media (max-width: 1232px) {
    display: none;
  }
  &__header {
  }
  &__container {
    padding: 1rem;
  }
  &__infos {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $shadow-1;
    }
    h4 {
      margin-top: 10px;
      text-transform: capitalize;
    }
    &_btns {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      button {
        width: 100px;
        height: 35px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        &:first-of-type {
          background: linear-gradient($blue-color, #0000ff34);
          color: #fff;
        }
        &:last-of-type {
          color: #555;
        }
      }
    }
  }
  &__links {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    li {
      width: 50px;
      height: 50px;
      background: $grey-color;
      border-radius: 50%;
      display: grid;
      place-items: center;
      transition: 0.2s;
      svg {
        width: 30px;
        height: 30px;
        stroke: $blue-color;
      }
      &:hover {
        background: $blue-color;
        svg {
          stroke: #fff;
        }
      }
      &:nth-of-type(3),
      &:nth-of-type(4) {
        svg {
          fill: $blue-color;
        }
        &:hover {
          svg {
            fill: #fff;
          }
        }
      }
    }
  }
  &__footer {
    position: absolute;
    bottom: 0;
    transform: rotate(180deg);
  }
}
```

### 43. Home main header

- update [Header.js](./components/home/main/User.js)

```js
<div className={styles.header}>
  <ul>
    <li>
      <Link href="">Store</Link>
    </li>
    <li>
      <Link href="">Electronics</Link>
    </li>
    <li>
      <Link href="">Watches</Link>
    </li>
  </ul>
</div>
```

### 44. Home main responsive

- [Main](./components/home/main/index.js)

```scss
@media (max-width: 1232px) {
  grid-template-columns: 1fr 3fr;
}
@media (max-width: 990px) {
  grid-template-columns: 80px 3fr;
}
@media (max-width: 730px) {
  grid-template-areas:
    "menu"
    "swiper"
    "offers";
  grid-template-columns: 1fr;
  .menu {
    width: 100% !important;
    height: fit-content !important;
    &__list {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap;
      justify-content: center;
      li {
        transform: translateY(-25px);
      }
    }
  }
}
```

- [Menu](./components/home/main/Menu.js)

```scss
@media (max-width: 990px) {
  width: 80px;
  svg {
    transform: scale(1.5);
  }
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

&__header {
  width: 100%;
  height: 35px;
  background: $grey-color;
  border-bottom: 1px solid $grey-color;
  box-shadow: $shadow-2;
  @media (max-width: 990px) {
    display: none !important;
    svg,
    b {
      display: none;
    }
  }
  svg {
    height: 23px;
    width: 23px;
  }
}

@media (max-width: 990px) {
  display: none;
}
```

- [Header](./components/home/main/Header.js)

```scss
@media (max-width: 730px) {
  display: none !important;
}
```

- [Offers](./components/home/main/offers.js)

```scss
@media (max-width: 1232px) {
  display: none;
}
```

### 45. Flash deals

- create [FlashDeals](./components/home/flashDeals/index.js)

```js
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import Countdown from "../../countdown";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";
import { flashDealsArray } from "../../../data/home";
import FlashCard from "./Card";
export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <Countdown date={new Date(2022, 12, 30)} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        <div className={styles.flashDeals__list}>
          {flashDealsArray.map((product, i) => (
            <SwiperSlide>
              <FlashCard product={product} key={i} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
```

- style [FlashDeals](./components/home/flashDeals/index.js)

```scss
.flashDeals {
  margin: 2rem 0;
  background: #fff;
  &__header {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-weight: 900;
    font-size: 25px;
    text-transform: uppercase;
    background: $yellow-color;
    margin-bottom: 10px;
    @media (max-width: 610px) {
      font-size: 18px;
    }
    @media (max-width: 508px) {
      font-size: 15px;
    }
    @media (max-width: 464px) {
      flex-direction: column;
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 1rem;
    @media (max-width: 600px) {
      justify-content: center;
    }
  }
}
.card {
  height: 420px;
  width: 283px;
  &__img {
    position: relative;
    width: 100%;
    height: 320px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .flash {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50px;
      height: 65px;
      background: $yellow-color;
      padding: 1rem;
      span {
        color: #333;
        font-weight: 600;
        font-size: 18px;
        transform: translateY(18px);
      }
      svg {
        position: absolute;
        transform: scale(2);
        fill: #333;
      }
    }
  }
  &__price {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 2px;
    span {
      font-weight: 700;
      &:first-of-type {
        color: $redish-color;
      }
      &:last-of-type {
        font-size: 14px;
        font-weight: normal;
        text-decoration: line-through;
        color: #666;
      }
    }
  }
  &__bar {
    width: 100%;
    height: 10px;
    border-radius: 10px;
    background: #ccc;
    margin-top: 2px;
    &_inner {
      background: $yellow-color;
      border-radius: 10px;
      height: 100%;
    }
  }
  &__percentage {
    font-size: 14px;
    color: #111;
    margin-top: 2px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
}
```

- create [Card](./components/home/flashDeals/Card.js)

```js
import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
export default function FlashCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          <img src={product.image} alt="" />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          <span>-{product.discount}%</span>
        </div>
      </div>
      <div className={styles.card__price}>
        <span>
          USD{(product.price - product.price / product.discount).toFixed(2)}$
        </span>
        <span>
          -USD
          {(
            product.price -
            (product.price - product.price / product.discount)
          ).toFixed(2)}$
        </span>
      </div>
      <div className={styles.card__bar}>
        <div className={styles.card__bar_inner} style={{ width: "75%" }}></div>
      </div>
      <div className={styles.card__percentage}>{product.sold}%</div>
    </div>
  );
}
```

### 46. Flash deals Countdown

- create [Countdown](./components/countdown/index.js)

```js
import { useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { calcaulateDiff } from "./utils";
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};
export default function Countdown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState();
  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInMs]);
  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calcaulateDiff(timeInMs));
  };
  return (
    <div className={styles.countdown}>
      {/*
      {[...Array(remainingTime?.days.length).keys()].map((d, i) => {
        if (remainingTime?.days == 0) {
          return;
        }
        return (
          <>
            <span>{remainingTime?.days.slice(i, i + 1)}</span> <b>:</b>
          </>
        );
      })}
      */}
      <span>{remainingTime?.hours.slice(0, 1)}</span>
      <span>{remainingTime?.hours.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.minutes.slice(0, 1)}</span>
      <span>{remainingTime?.minutes.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.seconds.slice(0, 1)}</span>
      <span>{remainingTime?.seconds.slice(1, 2)}</span>
    </div>
  );
}
```

- style [Countdown](./components/countdown/styles.module.scss)

```scss
.countdown {
  display: flex;
  align-items: center;
  gap: 2px;
  span {
    background: #333;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    font-size: 27px;
  }
  b {
    font-size: 20px;
  }
}
```

- install [dayjs](https://www.npmjs.com/package/dayjs)

```bash
npm i dayjs
```

- create[utils](./components/countdown/utils.js)

```js
import dayjs from "dayjs";
export function calcaulateDiff(timeInMs) {
  const timestamDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();
  if (timestamDayjs.isBefore(nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestamDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestamDayjs),
    hours: getRemainingHours(nowDayjs, timestamDayjs),
    days: getRemainingDays(nowDayjs, timestamDayjs),
  };
}

function getRemainingSeconds(nowDayjs, timestamDayjs) {
  const seconds = timestamDayjs.diff(nowDayjs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}
function getRemainingMinutes(nowDayjs, timestamDayjs) {
  const minutes = timestamDayjs.diff(nowDayjs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}
function getRemainingHours(nowDayjs, timestamDayjs) {
  const hours = timestamDayjs.diff(nowDayjs, "hours") % 60;
  return padWithZeros(hours, 2);
}
function getRemainingDays(nowDayjs, timestamDayjs) {
  const days = timestamDayjs.diff(nowDayjs, "days");
  return days.toString();
}

function padWithZeros(number, length) {
  const numberString = number.toString();
  if (numberString.length >= length) return numberString;
  return "0".repeat(length - numberString.length) + numberString;
}
```

### 47. Category cards

- install [react-responsive](https://www.npmjs.com/package/react-responsive)

```bash
npm i react-responsive
```

- create [Card](./components/home/category/index.js)

```js
import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";

export default function Category({ header, products, background }) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.slice(0, isMobile ? 6 : isMedium ? 4 : 6).map((product) => (
          <div className={styles.product}>
            <img src={product.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- create [styles.module.scss](./components/home/category/styles.module.scss)

```scss
.category {
  max-width: 500px;
  padding: 1rem;
  border-radius: 10px;
  h1 {
    color: #fff;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      width: 22px;
      height: 22px;
      cursor: pointer;
      fill: #fff;
      transition: all 0.2s;
      &:hover {
        transform: scale(1.1);
        fill: $yellow-color;
      }
    }
  }
  &__products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 1100px) {
      padding: 5px;
      gap: 8px;
    }
    .product {
      img {
        border-radius: 10px;
        height: 200px;
        width: 100%;
        cursor: pointer;
        transition: transform 0.2s ease;
        object-fit: cover;
        &:hover {
          transform: scale(1.02);
        }
        @media (max-width: 1000px) {
          height: 150px;
        }
        @media (max-width: 850px) {
          height: 200px;
        }
      }
    }
  }
}
```

- import [Category]() in [Home](./pages/index.js)

```js
<div className={styles.home__category}>
  <Category header="Dresses" products={women_dresses} background="#5a31f4" />
</div>
```

- import [women_dresses](./data/home.js)

### 48. Home products swiper

### 49. Home products swiper extra

### 50.

### 54.

### 55.

### 56.

### 57.

### 58.

### 59.

### 60.

## Section 8.

## Section 9.

## Section 10.

## 📚 external links

- 🔗 [Sass](https://www.npmjs.com/package/sass)
- 🔗 [Mongoose](https://www.npmjs.com/package/mongoose)
- 🔗 [Mongodb](https://www.npmjs.com/package/mongodb)
- 🔗 [Nextjs](https://nextjs.org/docs/getting-started)
- 🔗 [React-Icons](https://react-icons.github.io/react-icons/)
- 🔗 [ipregistry](https://ipregistry.co/)
- 🔗 [stripo](https://stripo.email/fr/)
- 🔗 [react-responsive](https://www.npmjs.com/package/react-responsive)
- 🔗 [dayjs](https://www.npmjs.com/package/dayjs)

## 📚 Knowledge about

- 🔗 [Object.values()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

```

```

```

```
