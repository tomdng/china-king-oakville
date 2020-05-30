import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from '../footer';
import Navbar from '../navbar';
import './normalize.css';

const StyledLayout: AnyStyledComponent = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  background: #fffff5;
  font-family: 'Mukta'; /* Default font */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      <main>{children}</main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
