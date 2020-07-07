import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { Menu /* , Close */ } from '@styled-icons/material';

import {
  accent,
  secondaryColor,
  textPrimaryLight,
  mobileWidth,
} from '../../settings';

const StyledMobileNav: AnyStyledComponent = styled.nav`
  width: 100%;
  background: ${secondaryColor};
  font-family: 'Noto Serif';

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

const StyledMobileNavWrapper: AnyStyledComponent = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledMenuIcon: AnyStyledComponent = styled(Menu)`
  width: 2.75rem;
  color: ${textPrimaryLight};
`;

interface MobileNavProps {
  siteTitle: string;
}

const MobileNavbar: React.FC<MobileNavProps> = ({ siteTitle }) => (
  <StyledMobileNav>
    <StyledMobileNavWrapper>
      <h1>{siteTitle}</h1>
      <StyledMenuIcon />
    </StyledMobileNavWrapper>
  </StyledMobileNav>
);

export default MobileNavbar;
