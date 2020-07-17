import React, { createContext, useReducer } from "react";
export const AuthContext = createContext();

const authReducer = (state, action) => {
  const { type, parameters } = action;
  switch (type) {
    case "badAuth":
      return {
        ...state,
        loading: false,
      };
    case "authorized":
      return {
        ...state,
        loading: false,
        jwt: window.localStorage.getItem("dizce_jwt"),
        authenticated: true,
        role: parameters.role,
      };
    case "internalError":
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
  authenticated: false,
  jwt: window.localStorage.getItem("dizce_jwt"),
  role: "",
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
