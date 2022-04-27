import React from "react";
import Product from "../Product/Product";

function ListElements({ product }) {
  return (
    <>
      {product.map((item, index) => (
        <Product item={item} key={index} />
      ))}
    </>
  );
}

export default ListElements;
