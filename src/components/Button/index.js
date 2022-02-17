import tw, { styled } from "twin.macro";
import { StyledButton, TailwindButton } from "./styles"


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