import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import { vh } from "../../../styles/Height";
import { AuthContext } from "../../../Contexts/AuthContext";
import Swal from "sweetalert2";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: calc(100vh - ${12 * vh}px);
  padding: ${5 * vh}px ${2 * vh}px;
`;

const ResultsWrapper = styled.div`
  ${({ display }) => (display ? "" : "display: none")}
`;

const ResultsHeader = styled.div`
  width: 33.3%;
  background: white;
  border: 2px black solid;
  display: flex;
  padding: ${1 * vh}px ${1 * vh}px;
  justify-content: center;
  align-items: center;
  font-size: ${2.5 * vh}px;
  margin-bottom: ${3 * vh}px;
`;

const Result = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  font-size: ${2 * vh}px;
  color: white;
  background: black;
  border: 2px white solid;
`;

export const ActiveUser = () => {
  const { authState } = useContext(AuthContext);
  const { jwt } = authState;

  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getActiveSessions = () => {
    setLoading(true);
    axios
      .get("/api/company/user/active", {
        headers: {
          Authorization: "Bearer" + " " + jwt,
        },
      })
      .then(({ data }) => {
        const { response } = data;
        setLoading(false);
        return setActiveUsers(response);
      })
      .catch(({ response }) => {
        const { error } = response.data;
        setLoading(false);

        return Swal.fire("Error", error, "error");
      });
  };

  useEffect(() => {
    getActiveSessions();
  }, []);
  return (
    <Container className="container">
      <button
        className="btn btn-warning"
        style={{ marginBottom: `${10 * vh}px` }}
        onClick={() => getActiveSessions()}
      >
        Refresh
      </button>
      {/* Could have used grid system, but meh */}
      <div style={{ display: "flex", width: "100%" }}>
        {["Nick", "Logged in", "Role"].map((name, index) => (
          <ResultsHeader key={index}>{name}</ResultsHeader>
        ))}
      </div>
      <ResultsWrapper display={!loading ? 1 : 0} style={{ width: "100%" }}>
        {activeUsers.map(({ nick, createdAt, role }, index) => {
          const sessionTime = new Date(createdAt);
          return (
            <div style={{ display: "flex", width: "100%" }} key={index}>
              <Result>{nick}</Result>
              <Result>
                {Math.floor((Date.now() - sessionTime.getTime()) / 60000)}{" "}
                minutes ago
              </Result>
              <Result>{role}</Result>
            </div>
          );
        })}
      </ResultsWrapper>
    </Container>
  );
};
