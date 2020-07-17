import React, { useState, useContext } from "react";
import { Container, AddForm, Input } from "./styles";
import { AuthContext } from "../../../Contexts/AuthContext";
import { vh } from "../../../styles/Height";

import Swal from "sweetalert2";
import axios from "axios";

const roles = ["admin", "free-admin", "users-admin", "users-active"];

const fields = [
  {
    name: "nick",
    placeholder: "NICK OF USER",
    type: "text",
  },
  {
    name: "name",
    placeholder: "REAL NAME",
    type: "text",
  },
  {
    name: "password",
    placeholder: "PASSWORD",
    type: "password",
  },
  {
    name: "country",
    placeholder: "COUNTRY",
    type: "text",
  },
];

export const AddUser = () => {
  const { authState } = useContext(AuthContext);
  const { jwt } = authState;

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("none");

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    return Swal.fire({
      title: "Are you sure?",
      text: "Be cautious",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Create User!",
    }).then(({ value }) => {
      if (value) {
        setLoading(true);
        axios
          .post("/api/company/user/add", form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer" + " " + jwt,
            },
          })
          .then(({ data }) => {
            setLoading(false);
            const { response } = data;
            document.querySelector("#add-form").reset();
            setRole("none");
            return Swal.fire("Created!", response, "success");
          })
          .catch(({ response }) => {
            const { error } = response.data;
            setLoading(false);
            return Swal.fire("Canceled", error, "error");
          });
      }
    });
  };

  return (
    <Container className="container">
      <AddForm id="add-form" onSubmit={(e) => onSubmit(e)}>
        {fields.map(({ name, placeholder, type }, index) => (
          <Input
            id={name}
            name={name}
            key={index}
            placeholder={placeholder}
            type={type}
            className="form-control"
            required
            disabled={loading}
          />
        ))}
        <select
          className="form-control"
          name="role"
          style={{ marginBottom: `${2 * vh}px` }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={loading}
          required
        >
          <option value="none" disabled hidden>
            Select role ...
          </option>
          {roles.map((role, index) => (
            <option value={role} key={index}>
              {role}
            </option>
          ))}
        </select>

        <Input
          className="btn btn-primary"
          type="submit"
          value="Create User"
          disabled={loading}
        />
        <div
          className="btn btn-danger"
          style={{
            width: "100%",
            marginBottom: `${2 * vh}px`,
            cursor: "pointer",
          }}
          onClick={() => {
            document.querySelector("#add-form").reset(), setRole("none");
          }}
        >
          Cancel
        </div>
      </AddForm>
    </Container>
  );
};
