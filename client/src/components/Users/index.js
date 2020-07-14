import React from "react";
import { Container, Menu } from "./styles";

export const Users = ({ role }) => {
  const allMethods = [
    { name: "Update", route: "/users/update" },
    { name: "Add", route: "/users/add" },
    { name: "Delete", route: "/users/delete" },
    { name: "Active Users", route: "/users/active" },
  ];
  const availableMethods = () => {
    switch (role) {
      case "admin":
        return allMethods;
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
