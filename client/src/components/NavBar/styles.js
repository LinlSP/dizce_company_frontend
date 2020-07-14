import styled from "styled-components";
import { vh } from "../../styles/Height";
import { Link as RouterLink } from "@reach/router";

const Container = styled.div`
  height: ${12 * vh}px;
  display: flex;
  align-items: center;
  padding: 0 ${2 * vh}px;
  justify-content: space-between;
  overflow-x: auto;
`;

const HomeIcon = styled(RouterLink)`
  height: 60%;
  margin-right: ${2 * vh}px;

  transition: 0.5s all ease;
  &:hover {
    opacity: 0.6;

    cursor: pointer;
  }
`;

const Link = styled(RouterLink)`
  color: white;
  font-weight: 300;
  font-size: ${3 * vh}px;
  margin-right: ${2 * vh}px;
  transition: 0.5s all ease;
  opacity: 0.7;
  &:hover {
    cursor: pointer;
    color: white;
    opacity: 1;

    text-decoration: none;
  }
  ${(props) => {
    if (props.currentpathindex === props.index)
      return "font-weight: bold;   opacity: 1;";
  }}
`;

const LogoutButton = styled.button`
  background-color: white;
  font-weight: bold;
  color: black;
  transition: 0.5s all ease;
  padding: ${1 * vh}px ${1.5 * vh}px;
  border: none;
  border-radius: ${5 * vh}px;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

export { Container, HomeIcon, LogoutButton, Link };
