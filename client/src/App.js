import React, { useContext } from "react";
import { Router, Redirect } from "@reach/router";

import { AuthContext } from "./AuthContext";

import { GlobalStyles } from "./styles/GlobalStyles";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

export const App = () => {
  const { error, auth } = useContext(AuthContext);
  if (error) {
    return <Error />;
  }
  if (!auth) {
    return (
      <>
        <GlobalStyles />
        <Router>
          <Login path="/login" />
          <Redirect from="/*" to="/login" default noThrow />
        </Router>
      </>
    );
  }
  return (
    <>
      <GlobalStyles />
      <Router>
        <Home path="/" />
        <Redirect from="/*" to="/" default noThrow />
      </Router>
    </>
  );
};
