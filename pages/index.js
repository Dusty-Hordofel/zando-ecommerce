import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  // console.log("🚀 ~ file: index.js:11 ~ Home ~ country", country);
  const { data: session } = useSession();
  console.log("🚀 ~ file: index.js:14 ~ Home ~ session", session);
  return (
    <>
      <Header country={country} />
      {session ? "You are logged in" : "you are not logged in"}
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
  // console.log("🚀 ~ file: index.js:26 ~ getServerSideProps ~ data", data);
  return {
    props: { country: { name: data.name, flag: data.flag.emojitwo } }, // will be passed to the page component as props
    // props: {
    //   country: {
    //     name: "France",
    //     flag: "https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png",
    //   },
    // }, // will be passed to the page component as props
  };
}
