import React, { useContext } from "react";
import axios from "axios";

import styled from "styled-components";
import { vh } from "../../../styles/Height";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - ${12 * vh}px);
  padding: ${5 * vh}px ${2 * vh}px;
`;

export const DeleteUser = () => {
  const { authState } = useContext(AuthContext);
  const { jwt } = authState;

  const deleteUser = () => {
    const nick = document.querySelector("#nick").value;
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to restore this user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete User!",
    }).then(({ value }) => {
      if (value) {
        axios
          .delete("/api/company/user/delete", {
            headers: {
              Authorization: "Bearer" + " " + jwt,
            },
            params: {
              nick: nick,
            },
          })
          .then(({ data }) => {
            const { response } = data;
            document.querySelector("#nick").value = "";
            return Swal.fire("Deleted!", response, "success");
          })
          .catch(({ response }) => {
            const { error } = response.data;
            return Swal.fire("Canceled", error, "error");
          });
      }
    });
  };
  return (
    <Container className="container">
      <input
        name="nick"
        id="nick"
        type="text"
        className="form-control"
        placeholder="NICK"
      />
      <button
        className="btn btn-danger"
        onClick={() => deleteUser()}
        style={{ width: "100%" }}
      >
        Delete
      </button>
    </Container>
  );
};
