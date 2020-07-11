import React, { createContext, useReducer } from "react";
export const AuthContext = createContext();
import axios from "axios";

const authReducer = (state, action) => {
  const jwt = state.jwt;
  switch (action.type) {
    case "landingAuth":
      if (jwt === null) {
        return {
          ...state,
          loading: false,
        };
      }
      axios
        .post("/api/company/login", {
          headers: {
            Authorization: "Bearer" + jwt,
          },
        })
        .then(({ data }) => {
          return {
            ...state,
            loading: false,
            authenticated: true,
          };
        })
        .catch(({ response }) => {
          if (response.status === 500) {
            return {
              ...state,
              error: true,
              loading: false,
            };
          }
          return {
            ...state,
            loading: false,
          };
        });
    case "authorized":
      return {
        ...state,
        loading: false,
        authenticated: true,
      };
    case "error":
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

const initialAuthStates = {
  error: false,
  loading: true,
  jwt: window.localStorage.getItem("dizce_jwt"),
  authenticated: false,
};

const Provider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthStates);
  const value = {
    authState,
    authDispatch,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default {
  Provider,
  Consumer: AuthContext.Consumer,
};
