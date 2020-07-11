import React, { useContext, useEffect } from "react";
import { Router, Redirect } from "@reach/router";

import { AuthContext } from "./AuthContext";

import { GlobalStyles } from "./styles/GlobalStyles";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Loader } from "./pages/Loader";

export const App = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { authenticated, error, loading } = authState;

  useEffect(() => {
    authDispatch({ type: "landingAuth" });
  }, []);
  ////////////////////////
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loader />;
  }
  if (!authenticated) {
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
