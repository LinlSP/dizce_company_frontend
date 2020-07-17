import React from "react";
import { Container, HomeIcon, LogoutButton, Link } from "./styles";
import logo from "../../assets/logo.svg";

export const NavBar = ({ routes, locationPath }) => {
  const paths = routes.map(({ route }) => route);
  const logOut = () => {
    window.localStorage.removeItem("dizce_jwt");
    location.reload();
  };

  const currentPageIndex = paths.indexOf(locationPath);

  return (
    <div style={{ background: "black" }}>
      <Container className="container">
        <HomeIcon to="/">
          <img height="100%" src={logo} alt="" />
        </HomeIcon>
        {routes.map(({ component, route }, index) => (
          <Link
            key={index}
            to={route}
            currentpathindex={currentPageIndex}
            index={index}
          >
            {component}
          </Link>
        ))}
        <LogoutButton onClick={() => logOut()}>LogOut</LogoutButton>
      </Container>
    </div>
  );
};
