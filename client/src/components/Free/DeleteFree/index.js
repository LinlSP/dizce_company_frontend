import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { AuthContext } from "../../../Contexts/AuthContext";
import { Container, Form, Input } from "./styles";
import { vh } from "../../../styles/Height";

import { languagesOptions } from "../envConstants";

export const DeleteFree = () => {
  const { authState } = useContext(AuthContext);
  const { jwt } = authState;

  const [language, setLanguage] = useState("none");
  const [loading, setLoading] = useState(false);

  const deleteSite = (e) => {
    e.preventDefault();
    var name = document.querySelector("#name").value;

    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete site!",
    }).then(({ value }) => {
      if (value) {
        setLoading(true);
        axios
          .delete("/api/client/free/delete", {
            headers: {
              Authorization: "Bearer" + " " + jwt,
            },
            params: { name: name, language: language },
          })
          .then(({ data }) => {
            const { response } = data;
            name = "";
            setLanguage("none");
            setLoading(false);
            return Swal.fire("Deleted!", response, "success");
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
      <Form onSubmit={(e) => deleteSite(e)}>
        <Input
          id="name"
          name="name"
          className="form-control"
          type="text"
          placeholder="Site Name"
          disabled={loading}
          required
        />
        <select
          className="form-control"
          name="language"
          style={{ marginBottom: `${2 * vh}px` }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={loading}
          required
        >
          <option value="none" disabled hidden>
            Language of the site...
          </option>
          {languagesOptions.map((lang, index) => (
            <option value={lang} key={index}>
              {lang}
            </option>
          ))}
        </select>

        <Input
          type="submit"
          className="btn btn-danger"
          value="delete"
          disabled={loading}
        />
      </Form>
    </Container>
  );
};
