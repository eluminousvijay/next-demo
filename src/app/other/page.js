"use client";
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../../lib/hooks";
import {
  initializeUser,
  setUserData,
} from "../../lib/features/product/productSlice";


export default function ProductName({ data }) {

  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(initializeUser({ userData: data ? data.userData : "" }));
    initialized.current = true;
  }

  // Ensure that state.product and state.product.productData are defined before accessing productName
  const name = useAppSelector((state) => state.data?.userData);

  console.log('>>>>>>>>>>>>',name);

  return (
    <input
      value={name}
      onChange={(e) => dispatch(setUserData(e.target.value))}
    />
  );
}
