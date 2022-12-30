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

### 7.

### 8.

### 9.

### 10.

### 11.

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
[]()
[]()
[]()
