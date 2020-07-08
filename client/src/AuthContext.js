import React, { createContext, useState } from "react";
export const AuthContext = createContext();

const Provider = ({ children }) => {
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState(false);
  const value = {
    auth,
    error,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default {
  Provider,
  Consumer: AuthContext.Consumer,
};
