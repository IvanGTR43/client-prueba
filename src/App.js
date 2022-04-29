import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import AuthProviders from "./providers/AuthProviders";

import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Error404 from "./pages/Error404";

function App() {
  return (
    <div>
      <AuthProviders>
        <Router>
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route path={"/login"} exact={true} element={<SignIn />} />
            <Route element={<Error404 />} exact={false} />
          </Routes>
        </Router>
      </AuthProviders>
    </div>
  );
}

export default App;
