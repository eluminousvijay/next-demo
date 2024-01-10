"use client";
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../../lib/hooks";
import {
  initializeProduct,
  setProductName,
} from "../../lib/features/product/productSlice";


export default function ProductName({ product }) {
    let temp  = [name=>'dddsdf'];
    // let temp  = [];

    console.log('>>>>>>>fsdf',temp[0]?.name);

  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  if (!initialized.current) {
    dispatch(
      initializeProduct({ productName: product ? product.productName:'' })
    );
    initialized.current = true;
  }

  // Ensure that state.product and state.product.productData are defined before accessing productName
  const name = useAppSelector(
    (state) => state.product?.productData?.productName
  );

  console.log('>>>>>>>>>>>>',name);

  return (
    <input
      value={name}
      onChange={(e) => dispatch(setProductName(e.target.value))}
    />
  );
}
