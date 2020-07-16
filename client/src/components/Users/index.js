import React from "react";
import { Container, Menu } from "./styles";

export const Users = ({ role }) => {
  const allMethods = [
    { name: "Active Users", route: "/users/active" },
    { name: "Add", route: "/users/add" },
    { name: "Delete", route: "/users/delete" },
  ];
  const availableMethods = () => {
    switch (role) {
      case "admin":
        return allMethods;
      case "users-admin":
        return allMethods;
      case "users-active":
        return allMethods.slice(0, 1);
      default:
        return;
    }
  };
  var methods = availableMethods();
  return (
    <Container className="container">
      {methods.map(({ name, route }, index) => (
        <Menu key={index} to={route}>
          {name}
        </Menu>
      ))}
    </Container>
  );
};
