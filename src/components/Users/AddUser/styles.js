import styled from "styled-components";
import { vh } from "../../../styles/Height";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${12 * vh}px);
  padding: ${5 * vh}px ${2 * vh}px;
`;

const AddForm = styled.form`
  width: 100%;
  border: ${0.5 * vh}px black solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${2 * vh}px ${1 * vh}px 0;
  border-radius: ${2 * vh}px;
`;

const Input = styled.input`
  font-size: ${2 * vh}px;
  margin-bottom: ${2 * vh}px;
  width: 100%;
  ${(props) => {
    return props.extra;
  }}
`;

export { Container, AddForm, Input };
