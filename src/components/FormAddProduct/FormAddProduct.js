import React, { useState, useEffect, useCallback } from "react";
import {
  addProductApi,
  uploadImageApi,
  updateProductApi,
} from "../../api/product";
import { useDropzone } from "react-dropzone";
import { getAccessTokenApi } from "../../api/auth";

import "./FormAddProduct.css";

function FormAddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    url: "",
  });
  const [imageProduct, setImageProduct] = useState(null);

  console.log(imageProduct);
  useEffect(() => {
    if (imageProduct != null) {
      setProduct({ ...product, url: imageProduct.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageProduct]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getAccessTokenApi();
    addProductApi(token, {
      name: product.name,
      description: product.description,
      url: Math.random().toString(),
    })
      .then((response) => {
        console.log(response.message);
        let idUSer = response.product._id;
        console.log(idUSer);
        // Ahora a subir la image
        // if (typeof imageProduct.file === "object") {
        //   uploadImageApi(token, imageProduct.file, idUSer)
        //     .then((respone) => {
        //       console.log(response);
        //       updateProductApi(token, product, idUSer)
        //         .then((response) => {
        //           alert(response.message);
        //         })
        //         .catch((err) => {
        //           console.log(err);
        //         });
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // }
        alert(response.mesage);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  return (
    <div>
      <div className="upload-image">
        <UploadAvatar
          imageProduct={imageProduct}
          setImageProduct={setImageProduct}
        />
      </div>
      <form>
        <input
          required
          placeholder="Nombre del Producto"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          required
          placeholder="Descripción del Producto"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

export default FormAddProduct;

function UploadAvatar(props) {
  const { imageProduct, setImageProduct } = props;
  const [productUrl, setproductUrl] = useState(null);

  useEffect(() => {
    if (imageProduct) {
      if (imageProduct.preview) {
        setproductUrl(imageProduct.preview);
      } else {
        setproductUrl(imageProduct);
      }
    } else {
      setproductUrl(null);
    }
  }, [imageProduct]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImageProduct({ file, preview: URL.createObjectURL(file) });
    },
    [setImageProduct]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpg, image/png",
    noKeyboard: true,
    onDrop,
  });
  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <img style={{ width: "150px" }} />
      ) : (
        <img style={{ width: "150px" }} src={productUrl && productUrl} />
      )}
    </div>
  );
}
