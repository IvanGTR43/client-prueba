import { BASE_PATH, API_VERSION } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constant";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === null) {
    return null;
  }
  return willExpiredToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi(token) {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken || refreshToken === null) {
    return null;
  }
  return willExpiredToken(refreshToken) ? null : refreshToken;
}

export function refereshAccessToken(refreshToken) {
  const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;
  const bodyObj = {
    refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application-json",
    },
  };

  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        logOut();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

export function logOut() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}
function willExpiredToken(token) {
  const sec = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + sec) / 1000;
  return now > exp;
}
