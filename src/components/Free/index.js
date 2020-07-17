import React from "react";
import { Container, Menu } from "./styles";

export const Free = ({ role }) => {
  const allMethods = [
    { name: "Update", route: "/free/update" },
    { name: "Add", route: "/free/add" },
    { name: "Delete", route: "/free/delete" },
  ];
  const availableMethods = () => {
    switch (role) {
      case "admin":
        return allMethods;
      case "free-admin":
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
