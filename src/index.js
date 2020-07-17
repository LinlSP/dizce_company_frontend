import React from "react";
import ReactDom from "react-dom";

import { App } from "./App";
import AuthContext from "./Contexts/AuthContext";

ReactDom.render(
  <AuthContext.Provider>
    <App />
  </AuthContext.Provider>,
  document.getElementById("App")
);
