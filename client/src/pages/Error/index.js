import React from "react";

/// /////////////////////////////////////////////////////////////////////////////////Styles
import { Text, Icon, Container } from "./styles";

/// /////////////////////////////////////////////////////////////////////////////////Resources and Components
import errorSrc from "../../assets/error.svg";
// import { useDisableHeader } from "../../customHooks/useDisableHeader";
import { useReturnToMenu } from "../../customHooks/useReturnToMenu";

/// /////////////////////////////////////////////////////////////////////////////////Self

export const Error = () => {
  /// ////////////////onMount hooks
  useReturnToMenu();
  // useDisableHeader();

  return (
    <>
      <Container
        extra="min-height:100vh;"
        flex
        flexCol
        justify="center"
        align="center"
        bgcolor="black"
      >
        <Icon src={errorSrc} />
        <Text>An error has ocurred :(</Text>
      </Container>
    </>
  );
};
