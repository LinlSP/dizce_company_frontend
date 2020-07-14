import styled from "styled-components";
import { vh } from "../../styles/Height";
import { Link } from "@reach/router";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - ${12 * vh}px);
  justify-content: space-around;
`;

const Menu = styled(Link)`
  margin: ${5 * vh}px;
  background: black;
  transition: 0.5s all ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${30 * vh}px;
  width: ${30 * vh}px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;
export { Container, Menu };
