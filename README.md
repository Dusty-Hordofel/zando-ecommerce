This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:`bashnpm run dev# oryarn dev`Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial. You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Zando - An eCommerce Website

Zando is a fully responsive ecommerce website, maximum compatiblities in all mobile devices, built using HTML, CSS, and JavaScript.I have used codewithsadee tutorial for learning purpose and follow all steps to gain new knowledges . Practice makes improvement.

## Demo

![Zando Desktop Demo](./website-demo-image/desktop.png "Desktop Demo")![Zando Mobile Demo](./website-demo-image/mobile.png "Mobile Demo")

## Section 1. Setup

### 1. Create Next app

- create zando - ecommerce folder- install nextjs

```bash $ pnpm create next-app

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

### 12.

### 13.

### 14.

### 15.

### 16.

### 17.

### 18.

### 19.

### 20.

### 21.

### 22.

### 23.

### 24.

### 25.

### 26.

### 27.

### 28.

### 29.

### 30.

## external links

[Sass](https://www.npmjs.com/package/sass)
[Mongoose](https://www.npmjs.com/package/mongoose)
[Mongodb](https://www.npmjs.com/package/mongodb)
[Nextjs](https://nextjs.org/docs/getting-started)
[React-Icons](https://react-icons.github.io/react-icons/)
[]()
[]()
