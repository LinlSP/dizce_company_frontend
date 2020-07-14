import React from "react";
import { Router, Redirect, Location } from "@reach/router";

import { NavBar } from "../components/NavBar";
import { Home } from "../components/Home";

import { Free } from "../components/Free";
import { Users } from "../components/Users";
import { AddFree } from "../components/Free/AddFree";

const navRoutes = [
  { component: "Free", route: "/free" },
  { component: "Users", route: "/users" },
];
const renderRoutes = [
  { component: Free, route: "/free" },
  // { component: UpdateFree, route: "/free/update" },
  { component: AddFree, route: "/free/add" },
  // { component: DeleteFree, route: "/free/delete" },
  { component: Users, route: "/users" },
  // { component: UpdateUser, route: "/users/update" },
  // { component: AddUser, route: "/users/add" },
  // { component: DeleteUser, route: "/users/delete" },
  // { component: ActiveUser, route: "/users/active" },
];

export const RoleHoc = ({ role }) => {
  const routesByRole = () => {
    switch (role) {
      case "admin":
        return [navRoutes, renderRoutes];
      case "free-admin":
        return [navRoutes.slice(0, 1), renderRoutes.slice(0, 4)];
      default:
        return;
    }
  };
  var routes = routesByRole();
  return (
    <>
      <Location>
        {({ location }) => (
          <NavBar routes={routes[0]} locationPath={location.pathname} />
        )}
      </Location>
      <Router>
        <Home path="/" />
        {routes[1].map(({ component, route }, index) =>
          React.createElement(component, {
            key: index,
            path: route,
            role: role,
          })
        )}
        <Redirect from="/*" to="/" default noThrow />
      </Router>
    </>
  );
};
