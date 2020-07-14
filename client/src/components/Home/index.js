import React from "react";
import styled from "styled-components";
import { vh } from "../../styles/Height";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${12 * vh}px);
`;

const Text = styled.div`
  font-size: ${4 * vh}px;
  color: black;
  text-align: center;
  font-weight: bold;
`;

export const Home = () => {
  return (
    <Container className="container">
      <Text>Click a Link from the Navigation Bar and start navigating.</Text>
    </Container>
  );
};
