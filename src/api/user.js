import { BASE_PATH, API_VERSION } from "./config";

export async function signUpApi(data) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    if (result_1.user) {
      return {
        status: true,
        message: "Usuario Creado Correctamente",
      };
    }
    return {
      status: false,
      message: result_1.message,
    };
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
}

export async function signInApi(data) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, params);
    const result_1 = await response.json();
    return result_1;
  } catch (e) {
    return e.message;
  }
}
