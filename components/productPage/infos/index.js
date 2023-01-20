import styles from "./styles.module.scss";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/Link";
import { TbPlus, TbMinus } from "react-icons/tb";
import { useEffect } from "react";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "./share";
import Accordian from "./Accordian";
import SimillarSwiper from "./SimillarSwiper";
import axios from "axios";
import DialogModal from "../../dialogModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../../store/cartSlice";
import { hideDialog, showDialog } from "../../../store/DialogSlice";
import { signIn, useSession } from "next-auth/react";

//images and activeImg come from [[slug].js](./pages/product/[slug].js)
const Infos = () => {
  return <div>Infos</div>;
};

export default Infos;
