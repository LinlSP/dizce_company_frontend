import styled from "styled-components";
import { vh } from "../../../styles/Height";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${12 * vh}px);
  padding: ${5 * vh}px ${2 * vh}px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: ${2 * vh}px ${1 * vh}px;
`;

const Input = styled.input`
  font-size: ${2 * vh}px;
  margin-bottom: ${2 * vh}px;
  width: 100%;
  ${(props) => {
    return props.extra;
  }}
`;

export { Container, Form, Input };
