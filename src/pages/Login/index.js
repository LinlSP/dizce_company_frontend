import React, { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../Contexts/AuthContext";
import { Title, Form, Input, SubmitButton, ServerMsg } from "./styles";

import logo from "../../assets/logo2.png";

export const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const [{ message, loading }, setRequest] = useState({
    message: "",
    loading: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setRequest({ message: "", loading: true });
    const nick = document.querySelector("#nick").value;
    const password = document.querySelector("#password").value;
    const user = {
      nick: nick,
      password: password,
    };
    axios
      .post("/api/company/login", user)
      .then(({ data }) => {
        // I know this isn't a good practice for security reasons (Http only cookie would be better), but
        // such methods are impractical for the purposes of this project
        const { accesToken, role } = data.response;
        window.localStorage.setItem("dizce_jwt", accesToken);
        authDispatch({ type: "authorized", parameters: { role: role } });
        return;
      })
      .catch(({ response }) => {
        const { error } = response.data;
        if (response.status === 500) {
          return authDispatch({ type: "internalError" });
        }
        setRequest({ message: error, loading: false });
        return;
      });
  };

  return (
    <Form className="container" onSubmit={(e) => onSubmit(e)}>
      <Title>
        <img height="100%" src={logo} alt="" />
        Admin
      </Title>
      <Input
        id="nick"
        name="nick"
        className="form-control"
        type="text"
        placeholder="NICK"
        required
        disabled={loading}
      />
      <Input
        id="password"
        name="password"
        className="form-control"
        type="password"
        placeholder="PASSWORD"
        required
        disabled={loading}
      />
      <ServerMsg>{message}</ServerMsg>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <SubmitButton
          type="submit"
          className="btn btn-primary btn-dark"
          value="Go"
          disabled={loading}
        />
      </div>
    </Form>
  );
};
