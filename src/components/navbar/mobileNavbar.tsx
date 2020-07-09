import React, { useState } from 'react';
import { Link } from 'gatsby';
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

const StyledNavOverlay: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 1rem 0;

  a {
    width: 90%;
    color: ${textPrimaryLight};
    font-family: Mukta;
    font-size: 24px;
    margin: 1rem;
    text-align: right;
  }
`;

interface MobileNavProps {
  siteTitle: string;
}

const MobileNavbar: React.FC<MobileNavProps> = ({ siteTitle }) => {
  const [overlay, setOverlay] = useState(false);

  const toggleOverlay = () => {
    setOverlay(!overlay);
  };

  return (
    <StyledMobileNav>
      <StyledMobileNavWrapper>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <StyledMenuIcon onClick={toggleOverlay} />
      </StyledMobileNavWrapper>
      {overlay ? (
        <StyledNavOverlay>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
        </StyledNavOverlay>
      ) : null}
    </StyledMobileNav>
  );
};

export default MobileNavbar;
