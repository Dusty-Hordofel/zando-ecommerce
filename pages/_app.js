import "../styles/globals.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store); //to persist the stored information
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zando</title>
        <meta
          name="description"
          content="Zando-online shopping service for all of your needs "
        />
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
