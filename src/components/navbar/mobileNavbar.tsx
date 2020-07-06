import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';

import { accent, secondaryColor, mobileWidth } from '../../settings';

const StyledMobileNav: AnyStyledComponent = styled.nav`
  width: 100%;
  background: ${secondaryColor};
  font-family: 'Noto Serif';
  display: flex;
  flex-direction: row;

  h1 {
    font-size: 30px;
    font-weight: 900;
    color: ${accent};
  }

  a {
    text-decoration: none;
    color: ${accent};
  }

  @media (min-width: ${mobileWidth}) {
    display: none;
  }
`;

interface MobileNavProps {
  siteTitle: string;
}

const MobileNavbar: React.FC<MobileNavProps> = ({ siteTitle }) => (
  <StyledMobileNav>
    <h1>{siteTitle}</h1>
    <p>Hi</p>
  </StyledMobileNav>
);

export default MobileNavbar;
