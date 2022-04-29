import React, { useState } from "react";
import { deleteProductpApi, updateProductApi } from "../../api/product";
import { getAccessTokenApi } from "../../api/auth";

//import Modal from "../Modal/Modal";
import { Modal } from "antd";

import "./Product.css";

function Product(props) {
  const { item, setRefresh, setShop, shop, newData, setNewData, handleSubmit } =
    props;
  const { url, name, description, _id } = item;

  const deleteProduct = () => {
    const token = getAccessTokenApi();
    deleteProductpApi(token, _id).then((response) => {
      console.log(response);
      if (response.code === 200) {
        alert(response.message);
        setRefresh(true);
      } else {
        alert("No se Pudo Eliminar, intenta mas tarde");
      }
    });
  };

  const buyProduct = () => {
    setShop([...shop, item]);
  };
  const info = () => {
    Modal.info({
      title: "This is a notification message",
      content: (
        <div className="modal">
          <form>
            <input
              required
              placeholder="Nuevo Nombre"
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            />
            <input
              required
              placeholder="Nueva Descripcion"
              onChange={(e) =>
                setNewData({ ...newData, description: e.target.value })
              }
            />
            <button type="submit" onClick={(e) => handleSubmit(e, item._id)}>
              Actualizar Producto
            </button>
          </form>
        </div>
      ),
      //onOk() {},
    });
  };
  return (
    <>
      <div className="product">
        <img src={url} style={{ width: "50px" }} alt={`imagen de ${name}`} />
        <h4>Nombre: {name}</h4>
        <p>Descripcion: {description}</p>
        <div className="buttonFile">
          <button onClick={(e) => deleteProduct()} className="delete">
            Eliminar
          </button>
          <button onClick={() => info()} className="update">
            Actualizar
          </button>
          <button className="buy" onClick={buyProduct}>
            Comprar
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
