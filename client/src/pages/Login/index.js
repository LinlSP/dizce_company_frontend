import React from "react";
import { Title, Form, Input, SubmitButton, ServerMsg } from "./styles";

import logo from "../../assets/logo2.png";

export const Login = () => {
  var message = "wrong password";
  const onSubmit = (e) => {
    e.preventDefault();
    const user = document.querySelector("#user").value;
    const password = document.querySelector("#password").value;
    console.log(user, password);
  };

  return (
    <Form className="container" onSubmit={(e) => onSubmit(e)}>
      <Title>
        <img height="100%" src={logo} alt="" />
        Admin
      </Title>
      <Input
        id="user"
        className="form-control"
        type="text"
        placeholder="USER"
        required
      />
      <Input
        id="password"
        className="form-control"
        type="password"
        placeholder="PASSWORD"
        required
      />
      <ServerMsg>{message}</ServerMsg>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <SubmitButton
          type="submit"
          className="btn btn-primary btn-dark"
          value="Go"
        />
      </div>
    </Form>
  );
};
