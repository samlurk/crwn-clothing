import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const StatusBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 30%;
  background-color: #f5f5f5;
  padding: 10px;
  margin: 0 5% 2% 0;
  text-align: center;
  border-radius: 10px;

  animation: ${fadeIn} 4s ease-in-out;
`;
