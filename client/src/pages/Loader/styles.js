import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: +1;
  background-color: rgba(93, 193, 185, 1);
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const animationOrigin = " transform-origin: bottom left;";

const Rotating = keyframes`
 0% {
   ${animationOrigin}
  }
  25% {
    ${animationOrigin}
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
    ${animationOrigin}
  }
  75% {
    transform: rotate(270deg);
    ${animationOrigin}
  }
  100% {
    transform: rotate(360deg);
    ${animationOrigin}
  }
`;

export const LoaderIcon = styled.img`
  position: relative;
  left: 7.5vh;
  bottom: 20vh;

  height: 15vh;
  animation: ${Rotating} 2s infinite;
`;
export const LoaderText = styled.div`
  position: relative;
  top: 5vh;
  font-size: 6vh;
  letter-spacing: 1vw;
  margin-right: -5vw;
  color: black;
`;
