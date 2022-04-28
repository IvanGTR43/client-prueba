import React, { useState } from "react";
import { deleteProductpApi, updateProductApi } from "../../api/product";
import { getAccessTokenApi } from "../../api/auth";
import { Modal, Button, Card, Col, Row } from "antd";

import "./Product.css";

function Product({ item, setRefresh, setShop, shop }) {
  const { url, name, description, _id } = item;
  const [modalOpen, setModalOpen] = useState(false);
  const [newData, setnewData] = useState({});

  const deleteProduct = () => {
    const token = getAccessTokenApi();
    deleteProductpApi(token, _id).then((response) => {
      console.log(response);
      if (response.code === 200) {
        alert(response.code);
        setRefresh(true);
      } else {
        alert("No se Pudo Eliminar, intenta mas tarde");
      }
    });
  };

  const handleSubmit = (e) => {
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
  const buyProduct = () => {
    setShop([...shop, item]);
  };
  return (
    <>
      <div className="product">
        <img src={url} style={{ width: "50px" }} alt={`imagen de ${name}`} />
        <h4>{name}</h4>
        <p>{description}</p>
        <div className="buttonFile">
          <button onClick={(e) => deleteProduct()} className="delete">
            Eliminar
          </button>
          <button onClick={() => setModalOpen(true)} className="update">
            Actualizar
          </button>
          <button className="buy" onClick={buyProduct}>
            Comprar
          </button>
        </div>
      </div>
      <div>
        <Modal
          visible={modalOpen}
          onCancel={() => setModalOpen(false)}
          title="Actualizar"
        >
          <div className="modal">
            <form>
              <input
                required
                placeholder="Nuevo NOmbre"
                onChange={(e) =>
                  setnewData({ ...newData, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Nueva Descripcion"
                onChange={(e) =>
                  setnewData({ ...newData, description: e.target.value })
                }
              />
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Agregar Producto
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Product;
