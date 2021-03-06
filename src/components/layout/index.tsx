import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from '../footer';
import Navbar from '../navbar';
import {
  secondaryColor,
  textPrimaryDark,
  tabletWidth,
  mobileWidth,
} from '../../settings';
import './normalize.css';

const StyledLayout: AnyStyledComponent = styled.div`
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
  background: #fffff5;
  font-family: 'Mukta'; /* Default font */
`;

const StyledChildren: AnyStyledComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  h1 {
    color: ${secondaryColor};
    font-family: 'Noto Serif';
    font-size: 72px;
    font-weight: 900;
  }

  p {
    font-family: 'Mukta';
    font-size: 30px;
    font-weight: 300;
  }

  a {
    font-weight: 600;
  }

  a:hover {
    color: ${textPrimaryDark};
  }

  @media (max-width: ${tabletWidth}) {
    h1 {
      font-size: 48px;
    }

    p {
      font-size: 20px;
    }
  }

  @media (max-width: ${mobileWidth}) {
    h1 {
      font-size: 36px;
    }

    p {
      font-size: 20px;
    }
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <StyledLayout>
      <Navbar siteTitle={data.site.siteMetadata.title} />
      <StyledChildren>{children}</StyledChildren>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
