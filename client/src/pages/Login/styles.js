import styled from "styled-components";
import { vh } from "../../styles/Height";

export const Title = styled.div`
  height: ${12 * vh}px;
  display: flex;
  font-size: ${4 * vh}px;
  font-weight: bold;
  color: white;
  align-items: flex-end;
  margin-bottom: ${5 * vh}px;
`;

export const Form = styled.form`
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${20 * vh}px ${3 * vh}px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: ${5 * vh}px;
`;

export const SubmitButton = styled.input`
  font-size: ${3 * vh}px;
  padding: ${0.2 * vh}px ${4 * vh}px;
`;

export const ServerMsg = styled.div`
  color: black;
  font-size: ${2.5 * vh}px;
  width: 100%;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
`;
