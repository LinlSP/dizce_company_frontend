import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    overflow-x: hidden;
  }
  body{
    overflow-x: hidden;
    font-family: 'Lato', sans-serif;
    background: rgba(93,193,185,1)

  }
  p{
    margin: 0
  }
  div{
    font-family: 'Lato', sans-serif;
    &:hover{
      cursor: context-menu;
    }
  }
`;
