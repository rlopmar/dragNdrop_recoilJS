import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: 1px solid grey;
  border-radius: 2px;
  box-shadow: 0px 2px 5px #888888;
  padding: 10px;

  &:active {
    box-shadow: none;
    margin-top: 3px;
  }
`;

const Button = React.memo((props) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
});

export default Button;
