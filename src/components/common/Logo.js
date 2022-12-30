import React from "react";

import styled from "styled-components";
import logoImage from "../../assets/image/logo-login.png";

export const LogoImage = styled.img`
  width: 100%;
  /* margin: 7.3rem 0 9.4rem 0; */
  transform: scale(0.8);
`;

const LogoImageDiv = styled.div`
//  padding: 7.3rem 0 9.4rem 0;
  display: flex;
  align-items: center;
`;

export default function Logo() {
  return (
    <LogoImageDiv>
      <LogoImage src={logoImage} alt="멍하냥" />
    </LogoImageDiv>
  );
}
