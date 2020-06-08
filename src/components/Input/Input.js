import styled from "styled-components";

const Input = styled.input`
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  font-family: sans-serif;
  margin: 10px 0;
  max-width: 100%;
  padding: 15px;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid #e9ecef;
  }

  &::placeholder {
    color: #e9ecef;
    font-size: 11px;
    letter-spacing: 1.1px;
    text-transform: uppercase;
  }

  @media all and (min-width: 380px) {
    max-width: 380px;
  }
`;

export default Input;
