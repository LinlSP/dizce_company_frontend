import React, { useContext, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import axios from "axios";

import { AuthContext } from "./Contexts/AuthContext";

import { GlobalStyles } from "./styles/GlobalStyles";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Loader } from "./pages/Loader";
import { RoleHoc } from "./hoc/RoleHoc";

export const App = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { jwt, authenticated, error, loading, role } = authState;

  const landingAuth = () => {
    if (jwt === null) {
      return authDispatch({ type: "badAuth" });
    }
    axios
      .post(
        "/api/company/login",
        {},
        {
          headers: {
            Authorization: "Bearer" + " " + jwt,
          },
        }
      )
      .then(({ data }) => {
        return authDispatch({
          type: "authorized",
          parameters: { role: data.response },
        });
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          return authDispatch({ type: "internalError" });
        }
        return authDispatch({ type: "badAuth" });
      });
  };

  useEffect(() => {
    landingAuth();
    return;
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
      <RoleHoc role={role} />
    </>
  );
};
