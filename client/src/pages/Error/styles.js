import styled from "styled-components";
import { vh } from "../../styles/Height";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  color: white;
  font-size: ${5 * vh}px;
  font-family: "Lato", sans-serif;
`;

export const Icon = styled.img`
  height: ${15 * vh}px;
`;
