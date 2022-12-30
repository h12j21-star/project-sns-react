import styled from "styled-components";
import Button from "../Button";

const LoginButton = styled(Button)`
  margin-top: 3rem;
  background-color: ${(props) => {
    if (props.isValue) {
      return props.theme.primaryColor;
    } else {
      return props.theme.secondaryColor;
    }
  }};
`;

export default LoginButton;
