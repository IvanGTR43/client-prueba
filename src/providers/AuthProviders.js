import React, { useState, useEffect, createContext } from "react";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refereshAccessToken,
  logOut,
} from "../api/auth";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();
export default function AuthProviders(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });
  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();
    if (!refreshToken) {
      logOut();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      refereshAccessToken(refreshToken);
    }
  } else {
    setUser({
      user: jwtDecode(accessToken),
      isLoading: false,
    });
  }
}
