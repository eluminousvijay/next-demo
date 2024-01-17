// utils/authUtils.js
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../../lib/hooks";
import {
  initializeUser,
  setUserData,
} from "../../lib/features/product/productSlice";

export const checkUserLoggedIn = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem(data);
    return userData;
  }else{
    return false;
  }  
};
