import React, { useState } from "react";

import "./Form.css";

const Form = (props) => {
  const {
    setDataUser,
    dataUser,
    handleSubmit,

    loginMode,
    setLoginMode,
    errorEmail,
    seterrorEmail,
    errorPassword,
    seterrorPassword,
  } = props;

  return (
    <div className="login">
      <div className="form">
        <form>
          <label>{errorEmail}</label>
          <input
            type="email"
            id="inputEmail"
            name="email"
            placeholder="Correo Electrónico"
            required
            value={dataUser.email}
            onChange={(e) =>
              setDataUser({ ...dataUser, email: e.target.value })
            }
          />
          <label>{errorPassword}</label>
          <input
            type="password"
            id="inputPassword"
            name="password"
            required
            placeholder="Contraseña"
            value={dataUser.password}
            onChange={(e) =>
              setDataUser({ ...dataUser, password: e.target.value })
            }
          />
          {loginMode === false && (
            <>
              <label>{errorPassword}</label>
              <input
                type="password"
                required
                id="inputRepeatPassword"
                name="repeat-password"
                placeholder=" Confirmar Contraseña"
                value={dataUser.repeatPassword}
                onChange={(e) =>
                  setDataUser({ ...dataUser, repeatPassword: e.target.value })
                }
              />
            </>
          )}

          <input
            type="submit"
            className="button"
            onClick={(e) => handleSubmit(e)}
            //disabled={isLoading}
            value={loginMode ? "Ingresar " : "Crear Cuenta"}
          />

          <p>
            {loginMode ? "No estas registrado aun?" : "Ya tienes cuenta?"}{" "}
            <strong onClick={() => setLoginMode(!loginMode)}>
              {loginMode ? "Registrate Aqui" : "Inicia Sesión Aqui"}
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
