import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Button } from "@react-ui-org/react-ui";

import {
  getProductsApi,
  addProductApi,
  uploadImageApi,
} from "../../api/product";

import FormAddProduct from "../../components/FormAddProduct/FormAddProduct";
import Product from "../../components/Product/Product";

import "./Home.css";

const Home = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [shop, setShop] = useState([]);
  console.log(shop);

  useEffect(() => {
    getProductsApi()
      .then((response) => {
        console.log(response.products);
        if (response.products) {
          setProducts(response.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(false);
  }, [refresh]);

  return (
    <div className="home">
      <h1>Agregar Productos y Comprarlos</h1>
      <div className="row">
        <div className="addProducts">
          <FormAddProduct product={product} setProduct={setProduct} />
        </div>
        <div className="products">
          {products.map((item, index) => (
            <Product
              item={item}
              setRefresh={setRefresh}
              key={index}
              setShop={setShop}
              shop={shop}
            />
          ))}
        </div>
      </div>
      <div className="row" id="final">
        {shop.map((item, inex) => (
          <>
            <div id="card">
              <img src={item.image} alt={item.name} style={{ width: "40px" }} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
