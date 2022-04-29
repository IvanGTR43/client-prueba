import React, { useState } from "react";

import { getAccessTokenApi } from "../../api/auth";
import { signInApi } from "../../api/user";
import { signUpApi } from "../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constant";
//import { validataEmail } from "../../utils/validateMail";

import Form from "../../components/FormLogin/Form";
import "./SignIn.css";
const SignIn = () => {
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [loginMode, setLoginMode] = useState(true);
  const [errorEmail, seterrorEmail] = useState("");
  const [errorPassword, seterrorPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrorEmail("");
    seterrorPassword("");

    if (loginMode) {
      if (validateForm()) {
        signIn();
      }
    } else {
      if (dataUser.password !== dataUser.repeatPassword) {
        seterrorPassword("Las Contraseñas no coinciden");
        return null;
      }
      if (!validateForm()) {
        return null;
      }
      signUp();
    }
  };
  const validateForm = () => {
    if (!dataUser.email) {
      seterrorEmail("Campo Obligatorio");
      return false;
    }
    if (!dataUser.password) {
      seterrorPassword("Campo Obliatorio");
      return false;
    }
    if (dataUser.password.length < 7) {
      seterrorPassword("La contraseña debe de tener mas de 6 Caracteres");
      return false;
    }

    // if (!validataEmail(dataUser.password)) {
    //   seterrorEmail("Correo Invalido");
    //   return false;
    // }
    return true;
  };
  // Consulta usuario en Inicia sesion
  const signIn = () => {
    signInApi({ email: dataUser.email, password: dataUser.password })
      .then((result) => {
        if (result.message) {
          console.log(result.message);
          alert(result.message);
        } else {
          const { accessToken, refreshToken } = result;
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);

          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUp = () => {
    signUpApi(dataUser)
      .then((result) => {
        if (result.message) {
          console.log(result.message);
          alert(result.message);
        } else {
          // si funciona limpia el form para iniciar sesion
          setLoginMode(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Form
        setDataUser={setDataUser}
        errorEmail={errorEmail}
        errorPassword={errorPassword}
        handleSubmit={handleSubmit}
        dataUser={dataUser}
        loginMode={loginMode}
        setLoginMode={setLoginMode}
      />
    </div>
  );
};

export default SignIn;
