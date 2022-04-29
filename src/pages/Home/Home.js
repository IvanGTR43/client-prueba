import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { getAccessTokenApi } from "../../api/auth";
import { updateProductApi } from "../../api/product";

import { getProductsApi, addProductApi } from "../../api/product";

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

  const [newData, setNewData] = useState({
    name: "",
    description: "",
  });

  // if (!getAccessTokenApi()) {
  //   window.location.href = "/login";
  // }

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

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    let token = getAccessTokenApi();
    updateProductApi(token, newData, _id)
      .then((response) => {
        if (response.code === 200) {
          alert(response.code);
        } else {
          console.log(response.code);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              key={Math.random().toString()}
              setShop={setShop}
              shop={shop}
              handleSubmit={handleSubmit}
              newData={newData}
              setNewData={setNewData}
            />
          ))}
        </div>
      </div>
      <div className="row" id="final">
        <h3>Productos Comprados</h3>
        {shop.map((item, inex) => (
          <div className="bought">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
