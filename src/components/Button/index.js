import React from 'react';
import { StyledButton, TailwindButton } from "./styles";

function Button() {
  return (
    <>
      <StyledButton>In Style</StyledButton>
      <br />
      <TailwindButton>In Tailwind Style</TailwindButton>
    </>
  )
}

export default Button;