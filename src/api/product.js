import { BASE_PATH, API_VERSION } from "./config";

export async function getProductsApi() {
  const url = `${BASE_PATH}/${API_VERSION}/get-products`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (err) {
    return err;
  }
}

export function deleteProductpApi(token, id) {
  const url = `${BASE_PATH}/${API_VERSION}/delete-product/${id}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export function addProductApi(token, product) {
  const url = `${BASE_PATH}/${API_VERSION}/add-product`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(product),
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function updateProductApi(token, id, product) {
  const url = `${BASE_PATH}/${API_VERSION}/update-product/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(product),
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getProductApi(id) {
  const url = `${BASE_PATH}/${API_VERSION}/get-product/${id}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function uploadImageApi(token, image, userId) {
  const url = `${BASE_PATH}/${API_VERSION}/upload-image/${userId}`;
  const formData = new FormData();
  formData.append("image", image, image.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getImageApi(imageName) {
  const url = `${BASE_PATH}/${API_VERSION}/get-image/${imageName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}
