import React from 'react';
import { Link } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import { secondaryColor, accent, textPrimaryLight } from '../../settings';

const StyledNavbar: AnyStyledComponent = styled.header`
  height: 6rem;
  width: 100%;
  background: ${secondaryColor};
  font-family: 'Noto Serif';

  h1 {
    font-size: 36px;
    font-weight: 900;
    color: ${accent};
  }

  a {
    text-decoration: none;
    color: ${accent};
  }
`;

const StyledNavWrapper: AnyStyledComponent = styled.div`
  width: 90vw;
  max-width: 1500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 auto;
`;

const StyledNavGroup: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;

  p {
    font-family: 'Mukta';
    font-size: 24px;
    font-weight: bold;
    margin-left: 2rem;
  }

  a {
    color: ${textPrimaryLight};
  }
`;

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle }): JSX.Element => (
  <StyledNavbar>
    <StyledNavWrapper>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <StyledNavGroup>
        <p>
          <Link to="/menu/">Menu</Link>
        </p>
        <p>
          <Link to="/about/">About</Link>
        </p>
      </StyledNavGroup>
    </StyledNavWrapper>
  </StyledNavbar>
);

export default Header;
